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
    //console.log(this.root)
    for (let i = 0; i < this.iterations; i++) {
      console.log('stop 10');
      let node = this.selection(this.root);
      console.log('stop 20');
      let reward = this.simulation(node);
      console.log('stop 30');
      this.backpropagation(node, reward);
      console.log('stop 40');
    }
    return this.getBestMove();
  }

  selection(node) {
    let test_i = 0;
    console.log('node.isFullyExpanded: ', node.isFullyExpanded());
    console.log('node.isTerminal: ', node.isTerminal());
    while (!node.isFullyExpanded() && !node.isTerminal() && test_i < 6) {
      node = node.expand();
      if (test_i === 5) {
        break;
      }
      test_i = + 1;
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
