// Handles state representation and cloning
import { rulesControl } from "../../services/RulesControl";
import { gameStateManager } from "../../services/GameStateManager";

class mctsState {
  constructor(boardMatrix, currentPlayer, passCounter, boardX, boardY, movesMade) {

    if (!Array.isArray(boardMatrix) || boardMatrix.length === 0) {
      throw new Error("Invalid boardMatrix: must be a non-empty 2D array.");
    }

    this.initializeEventListeners();

    this.boardMatrix = boardMatrix.map(row => [...row]);
    this.currentPlayer = currentPlayer;
    this.passCounter = passCounter;
    this.lastMoveX = boardX;
    this.lastMoveY = boardY;
    this.movesMade = movesMade;
    this.isTerminal = false;
  }

  initializeEventListeners() {
		document.addEventListener('end-game', () => {
      this.isTerminal = true;
		});
	}

  clone() {
    const clone = new mctsState(this.boardMatrix, this.currentPlayer);
    clone.passCounter = this.passCounter;
    clone.lastMoveX = this.lastMoveX;
    clone.lastMoveY = this.lastMoveY;
    console.log('clone: ', clone);
    return clone;
  }

  applyMove(x, y) {
    const isValid = rulesControl.isMoveValid(x, y, this.boardMatrix, this.currentPlayer); // <==== ERROR is here
    if (isValid.isValid) {
      this.boardMatrix[x][y] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
      this.lastMoveX = x;
      this.lastMoveY = y;
      this.passCounter = 0;
    } else {
      this.passCounter++;
    }
    return isValid.isValid;
  }

  arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
  }

  getPossibleMoves() {
    const availableMoves = [];
    for (let i = 0; i < gameStateManager.boardSize; i++) {
      for (let j = 0; j < gameStateManager.boardSize; j++) {
        if (this.boardMatrix[i][j] === null) { // Assuming null indicates an empty cell
          availableMoves.push([i, j]); // Collect the coordinates of valid moves
        }
      }
    }
    return availableMoves; // Returns an array of coordinates representing valid moves
  }
}

export { mctsState };
