// Main engine that coordinates the simulation and selection

import { MonteCarloSimulation } from "./MonteCarloSimulation.js";
import { MoveSelection } from "./MoveSelection.js";

class MonteCarloEngine {
  constructor(numSimulations = 5) {
    this.numSimulations = numSimulations;
  }

  run(state) {
    const simulationResults = [];
    for (let i = 0; i < this.numSimulations; i++) {
      const simulationResult = MonteCarloSimulation.simulate(state);
      simulationResults.push(simulationResult);
    }
    console.log(simulationResults); // TEST

    return MoveSelection.selectBestMove(simulationResults);
  }
}

export const monteCarloEngine = new MonteCarloEngine();
