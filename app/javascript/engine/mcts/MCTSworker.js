import { MCTS } from './MCTS.js'; // Adjust the import path as necessary
import { mctsState } from './MCTSstate.js'; // Adjust the import path

onmessage = (event) => {
    const { gameState, iterations } = event.data;
    const mcts = new MCTS(gameState, iterations);
    const bestMove = mcts.run(); // Run the MCTS algorithm
    postMessage(bestMove); // Send the best move back to the main thread
};
