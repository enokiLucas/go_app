// Logic for running the simulations
import { territoryScoring } from "../../services/score/TerritoryScoring.js";
import { gameStateManager } from "../../services/GameStateManager.js";

class MonteCarloSimulation {
  static simulate(state) {
    let simulationState = state.clone();
    if (!MonteCarloSimulation.isTerminal(simulationState)) {
      const move = MonteCarloSimulation.getHeuristicMove(simulationState);
      console.log(move);
      move.then((result) => {
        if (result === null) {
          //No valid moves. Pass move
          console.log("move === null");
          simulationState.passCounter += 1;
        } else {
          const [x, y] = result;
          simulationState.applyMove(x, y);
          simulationState.passCounter = 0; // Reset passCounter.
        }
      });
    }
    return {
      move: `${simulationState.lastMoveX},${simulationState.lastMoveY}`,
      score: MonteCarloSimulation.score(simulationState),
    };
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

  static async getHeuristicMove(state) {
    return new Promise((resolve, reject) => {
      const workerPath = new URL("heuristicWorker.js", import.meta.url);
      const worker = new Worker(workerPath);
      //const worker = new Worker("./heuristicWorker.js");
      worker.postMessage(state);
      worker.addEventListener("message", (e) => {
        const selectedMove = e.data;
        resolve(selectedMove);
      });
    });
  }

  static score(state) {
    return territoryScoring.countScore(state.boardMatrix, false);
  }
}

export { MonteCarloSimulation };
