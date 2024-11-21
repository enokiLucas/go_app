class Node {
  constructor(gameState, parent = null, move = null) {
    this.gameState = gameState; // Current state of the game
    this.parent = parent; // Parent node
    this.move = move; // Move that led to this state
    this.children = []; // Array of child nodes
    this.visitCount = 0; // Count of visits
    this.wins = 0; // Total wins from this node
  }

  isFullyExpanded() {
    return this.children.length === this.getPossibleMoves().length; // All possible moves have been explored
  }

  isTerminal() {
    return this.gameState.isTerminal(); // Check if the game is over
  }

  getPossibleMoves() {
    return this.gameState.getAvailableMoves(); // Returns available moves for this game state
  }

  expand() {
    const availableMoves = this.getPossibleMoves();
    if (availableMoves.length === 0) return this;

    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const newGameState = this.gameState.clone().applyMove(move);
    const childNode = new Node(newGameState, this, move);
    this.children.push(childNode);
    return childNode; // Return the newly created node
  }

  bestChild() {
    // UCB1 or other logic to find the best child based on results
    return this.children.reduce((best, child) => (child.wins / child.visitCount > best.wins / best.visitCount ? child : best), this.children[0]);
  }

  updateStats(reward) {
    this.visitCount += 1;
    this.wins += reward; // Adjust for how you want to handle wins
  }
}

export default Node;
