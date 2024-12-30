export class MCTSnode {
  constructor(gameState, parent = null, move = null) {
    this.gameState = gameState; // Current state of the game
    this.parent = parent; // Parent node
    this.move = move; // Move that led to this state
    this.children = []; // Array of child nodes
    this.visitCount = 0; // Count of visits
    this.wins = 0; // Total wins from this node
  }

  isFullyExpanded() {
    console.log('stop 5.1');
    return this.children.length === this.getPossibleMoves().length; // All possible moves have been explored
  }

  isTerminal() {
    console.log('stop 5.2');
    return this.gameState.isTerminal; // Check if the game is over
  }

  getPossibleMoves() { // need a function for this one
    return this.gameState.getPossibleMoves(); // Returns available moves for this game state
  }

  expand() {
    const availableMoves = this.getPossibleMoves();
    if (availableMoves.length === 0) return this;
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newGameState = this.gameState.clone();
    const childNode = new MCTSnode(newGameState, this, move);
    this.children.push(childNode);
    return childNode; // Return the newly created node
  }

  bestChild(c = Math.sqrt(2)) {
    let bestScore = -Infinity;
    let bestChild = null;
    for (const child of this.children) {
      const exploitation = child.wins / child.visitCount;
      const exploration = Math.sqrt(Math.log(this.visitCount) / child.visitCount);
      const ucb1 = exploitation + c * exploration;
      if (ucb1 > bestScore) {
        bestScore = ucb1;
        bestChild = child;
      }
    }
    return bestChild;
  }

  updateStats(reward) {
    this.visitCount += 1;
    this.wins += reward; // Adjust for how you want to handle wins
  }
}
