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
    console.log('hello from error');
    postMessage({ error: error.message }); // Send the error message back to the main thread
  }
};
