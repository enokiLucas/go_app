import { MCTS } from "./MCTS.js";
import { mctsState } from "./MCTSstate.js";

onmessage = (event) => {
  console.log('hello from message', event.data);
  try {
    const { gameState, iterations } = event.data;
    console.log('stop 1');
    const mcts = new MCTS(gameState, iterations);
    console.log('stop 2');
    const bestMove = mcts.run(); // Run the MCTS algorithm
    console.log('bestMove from the worker: ', bestMove);
    postMessage(bestMove); // Send the best move back to the main thread
  } catch (error) {
    console.log('hello from error');
    postMessage({ error: error.message }); // Send the error message back to the main thread
  }
};
