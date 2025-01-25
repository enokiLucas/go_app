import { MCTS } from "./MCTS.js";
import { mctsState } from "./MCTSstate.js";

onmessage = (event) => {
  try {
    const { stateData, iterations } = event.data;
    const gameState = new mctsState(
      stateData.currentBoardMatrix,
      stateData.currentPlayerTurn,
      stateData.currentPassCounter,
      stateData.currentBoardX,
      stateData.currentBoardY,
      stateData.currentMovesHistory
    );
    const mcts = new MCTS(gameState, iterations);
    const bestMove = mcts.run(); // Run the MCTS algorithm
    postMessage(bestMove); // Send the best move back to the main thread
  } catch (error) {
    const errorMessage = {
      message: error.message,
      stack: error.stack,
    }

    postMessage({ error: errorMessage }); // Send the error message back to the main thread
  }
};
