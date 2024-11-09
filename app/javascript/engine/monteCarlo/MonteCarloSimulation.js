// Logic for running the simulations
import { territoryScoring } from '../../services/score/TerritoryScoring.js'
import { gameStateManager } from '../../services/GameStateManager.js';

class MonteCarloSimulation {
  static simulate(state) {
    let simulationState = state.clone();
    while (!MonteCarloSimulation.isTerminal(simulationState)) {
      /*const [x, y] = MonteCarloSimulation.getHeuristicMove(simulationState);
      const [a, b] = MonteCarloSimulation.getRandomMove(simulationState);
      simulationState.applyMove(x, y);*/
      const move = MonteCarloSimulation.getHeuristicMove(simulationState);
      if (move === null) {
        //No valid moves. Pass move
        console.log('move === null');
        simulationState.passCounter += 1;
      } else {
        const [x, y] = move;
        simulationState.applyMove(x, y);
        simulationState.passCounter = 0; // Reset passCounter.
      }
    }
    return { move: `${simulationState.lastMoveX},${simulationState.lastMoveY}`, score: MonteCarloSimulation.score(simulationState) };
  }

  static isTerminal(state) {
    return state.passCounter >= 2;
  }

  static getRandomMove(state) {
    const availableMoves = [];
    for (let i = 0; i < state.boardMatrix.length; i++) {
      for (let j = 0; j < state.boardMatrix[i].length; j++) {
        if (state.boardMatrix[i][j] === null) {
          availableMoves.push([i, j]);
        }
      }
    }
    //console.log(availableMoves[Math.floor(Math.random() * availableMoves.length)]);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  }

  //Heuristic Moves
  static getHeuristicMove(state) {
    const availableMoves = [];
    for (let i = 0; i < state.boardMatrix.length; i++) {
      for (let j = 0; j < state.boardMatrix[i].length; j++) {
        if (state.boardMatrix[i][j] === null) {
          const heuristicValue = MonteCarloSimulation.evaluateMove(i, j, state);
          availableMoves.push({ coordinates: [i, j], heuristicValue });
        }
      }
    }

    // No Moves available
    if (availableMoves.length === 0) {
      return null;
    }

    // Sort moves by heuristic value and select the best one
    availableMoves.sort((a, b) => b.heuristicValue - a.heuristicValue);

    // Get all moves with the highest value.
    const highestValue = availableMoves[0].heuristicValue;
    const bestMoves = availableMoves.filter(move => move.heuristicValue === highestValue);

    //Randomly select one of the best moves
    const selectedMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];

    return selectedMove.coordinates;
  }

  static evaluateMove(x, y, state) {
    // Simple heuristic: prefer moves near existing stones
    const neighbors = [
      [x - 1, y], [x + 1, y],
      [x, y - 1], [x, y + 1]
    ];
    let score = 0;

    neighbors.forEach(([nx, ny]) => {
      if (nx >= 0 && nx < gameStateManager.boardSize && ny >= 0 && ny < gameStateManager.boardSize) { 
        const cellValue = state.boardMatrix[nx][ny];
        if (cellValue !== null) {
          if (cellValue === state.currentPlayer) {
            score += 1; // Adjacent to same color.
          } else {
            score -= 1; // Adjacent ro the opponent's
          }
        }
      }
    });
    return score;
  }

  static score(state) {
    return territoryScoring.countScore(state.boardMatrix, false);
  }
}

export { MonteCarloSimulation };
