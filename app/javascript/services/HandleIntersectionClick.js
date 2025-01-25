import { gameStateManager } from './GameStateManager.js';
import { rulesControl } from './RulesControl.js';
import { placeStoneOnBoard } from './PlaceStoneOnBoard.js';
import { convertToSGFPosition, getPlayerSGFColor } from '../utils/SGFUtil.js';
import { EDGE_MARGIN, LENGTH_SQUARE } from '../utils/constants.js';
import { captureRule } from './rules/CaptureRule.js';
import { influenceMap } from './InfluenceMap.js';

let lastMoveMetadata = {}; // Temporary storage for metadata outside of handleIntersectionClick

// Set up an event listener for capture metadata
document.addEventListener('new-metadata', (event) => {
	if(event.detail) {
		lastMoveMetadata = event.detail;
	} else {
		lastMoveMetadata = {};
	}
	// Possibly trigger the move logic here if it needs to wait for metadata
	// Or ensure makeMove is called after this event is processed
});


function updateBoard(board, x, y, boardX, boardY, player, ghostStone) {
	placeStoneOnBoard(board, x, y, player) // Place the stone on the board;
	const sgfPosition = convertToSGFPosition(x, y); //Convert the event coordinates into SGF positions.
	rulesControl.updateCell(boardX, boardY, player); // Update the logical board
	rulesControl.updateBoardState(); //Update the BoardState
	//ghostStone.setAttribute('fill', player); // Change the color of the ghost stone

	// Keep it as the last method
	gameStateManager.makeMove(boardX, boardY, lastMoveMetadata); //Add move to the game state
	ghostStone.setAttribute('fill', gameStateManager.currentPlayer); // Change the color of the ghost stone
	lastMoveMetadata = {}; //Reset lastMoveMetadata if necessary
}

function executeMove(board, ghostStone, x, y, boardX, boardY) {
	// Create a simulated boardMatrix and place the stone.
	const simulatedMatrix = rulesControl.createSimulatedBoardMatrix();
	simulatedMatrix[boardX][boardY] = gameStateManager.currentPlayer;

	// Save the validation result.
	const validationResult = rulesControl.isMoveValid(boardX, boardY, simulatedMatrix,  gameStateManager.currentPlayer);
	//Update the influence map.
	influenceMap.updateMap(simulatedMatrix);

	if (validationResult.isValid) {
		// Apply the move
		updateBoard(board, x, y, boardX, boardY, gameStateManager.currentPlayer, ghostStone);

		// Execute any captures identified during validation
		if (validationResult.captures.length > 0) {
			captureRule.removeStones(board, validationResult.captures);
			gameStateManager.addCaptures(gameStateManager.currentPlayer, validationResult.captures.length);
		}

	// Proceed with game flow, e.g., end turn, update UI
	} else {
		// Handle invalid move, e.g., display error message
		alert(validationResult.message);
	}
}

async function aiMakeMove(board, boardX, boardY, ghostStone, movesHistory) {
  const currentState = {
    currentBoardMatrix : rulesControl.boardMatrix,
    currentPlayerTurn : gameStateManager.currentPlayer,
    currentPassCounter : gameStateManager.getPassCounter(),
    currentBoardX : boardX,
    currentBoardY : boardY,
    currentMovesHistory : movesHistory
  };
  console.log('rules.control.boardMatrix: ', rulesControl.boardMatrix);

  // Create a new Worker
  const worker = new Worker(
    new URL('../engine/mcts/MCTSworker.js', import.meta.url),
    { type: 'module' }
  );

  // Send the initial data to the worker
  worker.postMessage({
    stateData: currentState,
    iterations: 2 // Adjust the number of iterations as needed
  });

  // Handle messages from the worker
  worker.onmessage = (event) => {
    const bestMove = event.data; // Get the best move from the MCTS calculation
    console.log('bestMove: ', bestMove);
    if (bestMove) {
      const [x, y] = bestMove; // Extract coordinates from the move string
      const cx = EDGE_MARGIN + (LENGTH_SQUARE * x);
      const cy = EDGE_MARGIN + (LENGTH_SQUARE * y);
      executeMove(board, ghostStone, cx, cy, x, y);
      console.log(`AI chose move at (${x}, ${y})`);
    } else {
      console.log("AI couldn't find a valid move.");
    }
    worker.terminate(); // Terminate the worker after use
  };

  // Optionally handle errors
  worker.onerror = (error) => {
    console.error("Worker error:", error);
    worker.terminate(); // Terminate if there's an error
  };
}


export async function handleIntersectionClick(board, event, ghostStone) {
	// Save the coordinates of the event.
	const x = event.target.cx.baseVal.value;
	const y = event.target.cy.baseVal.value;

	// Convert the event coordinates into board relative ones
	const boardX = (x - EDGE_MARGIN) / LENGTH_SQUARE;
	const boardY = (y - EDGE_MARGIN) / LENGTH_SQUARE;

	executeMove(board, ghostStone, x, y, boardX, boardY);
  const moveHistory = gameStateManager.movesHistory;
	await aiMakeMove(board, boardX, boardY, ghostStone, moveHistory);
}
