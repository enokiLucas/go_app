// heuristicWorker.js
self.addEventListener(
  "message",
  (e) => {
    const state = e.data;

    console.log("hello from worker");
    const availableMoves = [];
    for (let i = 0; i < state.boardMatrix.length; i++) {
      for (let j = 0; j < state.boardMatrix[i].length; j++) {
        if (state.boardMatrix[i][j] === null) {
          const heuristicValue = evaluateMove(i, j, state);
          availableMoves.push({ coordinates: [i, j], heuristicValue });
        }
      }
    }

    let selectedMove;
    if (availableMoves.length > 0) {
      availableMoves.sort((a, b) => b.heuristicValue - a.heuristicValue);
      const highestValue = availableMoves[0].heuristicValue;
      const bestMoves = availableMoves.filter(
        (move) => move.heuristicValue === highestValue,
      );
      selectedMove =
        bestMoves[Math.floor(Math.random() * bestMoves.length)].coordinates;
    } else {
      selectedMove = null;
    }

    self.postMessage(selectedMove);
  },
  false,
);

function evaluateMove(x, y, state) {
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  let score = 0;

  neighbors.forEach(([nx, ny]) => {
    if (
      nx >= 0 &&
      nx < state.boardMatrix.length &&
      ny >= 0 &&
      ny < state.boardMatrix[0].length
    ) {
      const cellValue = state.boardMatrix[nx][ny];
      if (cellValue !== null) {
        score += cellValue === state.currentPlayer ? 1 : -1;
      }
    }
  });

  return score;
}
