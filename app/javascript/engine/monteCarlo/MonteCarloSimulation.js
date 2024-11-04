// Logic for running the simulations
import { territoryScoring } from '../../services/score/TerritoryScoring.js'
import { gameStateManager } from '../../services/GameStateManager.js';

class MonteCarloSimulation {
  static simulate(state) {
    let simulationState = state.clone();
    console.log(simulationState);
    while (!MonteCarloSimulation.isTerminal(simulationState)) {
      console.log(simulationState);
      const [x, y] = MonteCarloSimulation.getHeuristicMove(simulationState);
      const [a, b] = MonteCarloSimulation.getRandomMove(simulationState);
      simulationState.applyMove(x, y);
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
    console.log(state);
    const availableMoves = [];
    for (let i = 0; i < state.boardMatrix.length; i++) {
      for (let j = 0; j < state.boardMatrix[i].length; j++) {
        if (state.boardMatrix[i][j] === null) {
          const heuristicValue = MonteCarloSimulation.evaluateMove(i, j, state);
          availableMoves.push({ coordinates: [i, j], heuristicValue });
        }
      }
    }

    // Sort moves by heuristic value and select the best one
    availableMoves.sort((a, b) => b.heuristicValue - a.heuristicValue);
    //console.log(availableMoves[0].coordinates);
    return availableMoves[0].coordinates;
  }

  static evaluateMove(x, y, state) {
    // Simple heuristic: prefer moves near existing stones (adjust this as needed)
    const neighbors = [
      [x - 1, y], [x + 1, y],
      [x, y - 1], [x, y + 1]
    ];
    let score = 0;
    neighbors.forEach(([nx, ny]) => {
      if (nx >= 0 && nx < gameStateManager.boardSize && ny >= 0 && ny < gameStateManager.boardSize && state.boardMatrix[nx][ny] !== null) { 
        score += 1; // Add points for being near another stone
      }
    });
    return score;
  }

  static score(state) {
    return territoryScoring.countScore(state.boardMatrix, false);
  }
}

export { MonteCarloSimulation };
