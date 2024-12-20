import { MCTSnode } from './MCTSnode.js';
import { territoryScoring } from '../../services/score/TerritoryScoring.js';

export class MCTS {
  constructor(gameState, iterations) {
    this.root = new MCTSnode(gameState);
    this.iterations = iterations;
  }

  /* Main Loop
  * Perfoms a specified number of iterations where it selects a node,
  * sets up a simulation from that node, and then update the tree.
  */
  run() {
    console.log(this.root)
    for (let i = 0; i < this.iterations; i++) {
      let node = this.selection(this.root);
      let reward = this.simulation(node);
      this.backpropagation(node, reward);
    }
    return this.getBestMove();
  }

  selection(node) {
    //console.log(node);
    while (!node.isFullyExpanded() && !node.isTerminal()) {
      node = node.expand();
      //console.log(node);
    }
    return node.bestChild();
  }

  simulation(node) {
    //console.log(node);
    const simulatedGameState = node.gameState.clone();
    // Choose random moves until the end of the game
    while (!simulatedGameState.isTerminal()) {
      const randomMove = simulatedGameState.getRandomMove();
      simulatedGameState.applyMove(randomMove);
    }
    return territoryScoring.countScore(simulatedGameState.board, false); // Assuming this returns a numeric outcome
  }

  backpropagation(node, reward) {
    while (node) {
      node.updateStats(reward);
      node = node.parent; // Move to the parent node
    }
  }

  getBestMove() {
    return this.root.bestChild().move; // Choose the best child of the root based on visit count or average score
  }
}
