import { MCTS } from "./MCTS.js"; // Adjust the import path as necessary
import { mctsState } from "./MCTSstate.js"; // Adjust the import path

console.log("hello from worker 1");

onmessage = (event) => {
  try {
    const { gameState, iterations } = event.data;

    // Ensure the gameState is properly serialized.
    const state = new mctsState(
      gameState.boardMatrix,
      gameState.currentPlayer,
      gameState.passCounter,
      gameState.lastMoveX,
      gameState.lastMoveY,
      gameState.movesMade,
    );

    const mcts = new MCTS(state, iterations);
    const bestMove = mcts.run(); // Run the MCTS algorithm
    postMessage(bestMove); // Send the best move back to the main thread
  } catch (error) {
    postMessage({ error: error.message }); // Send the error message back to the main thread
  }
};
