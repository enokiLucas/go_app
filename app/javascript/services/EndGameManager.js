import { gameStateManager } from './GameStateManager.js';
import { territoryScoring } from './score/TerritoryScoring.js';
import { deadStonesDetector } from './DeadStonesDetector.js';
import { rulesControl } from './RulesControl.js';

class EndGameManager {
	constructor() {
		this.initializeEventListeners();
    this.endMessage = ['The game has ended!\n'];
	}

	initializeEventListeners() {
		document.addEventListener('end-game', this.handleEndGame.bind(this));
	}

	handleEndGame(event) {
		const { type, player } = event.detail;
		switch (type) {
			case 'resignation':
				this.handleResignation(player); console.log('resignation');
				break;
			case 'timeout':
				this.handleTimeout(player); console.log('timeout');
				break;
			case 'passes':
				this.handleConsecutivePasses(); console.log('passes');
				break;
				// Add other cases as needed
		}
    gameStateManager.isTerminal = true;
		this.endGame();
	}

	handleResignation(player) {
		// Handle resignation logic
		const winner = player === 'black' ? 'white' : 'black';
		this.endMessage.push(`${winner} wins by resignation!`);
	}

	handleTimeout(player) {
		// Handle time-out logic
		const winner = player === 'black' ? 'white' : 'black';
		this.endMessage.push(`${winner} wins by timeout!`);
	}

	handleConsecutivePasses() {
		// Handle end game due to consecutive passes
		this.calculateFinalScore();
	}

	endGame() {
		// Finalize the game
		alert(this.endMessage);
		// Additional end game logic
    this.endMessage = [];
    this.endMessage.push('The game has ended!');
	}

	calculateFinalScore() {
		// Detect dead stones
		const deadStones = deadStonesDetector.detectDeadStones();
		this.removeDeadStones(deadStones);

		// Count territory and capture scores
		territoryScoring.countScore();

		// Get final scores
		const blackScore = territoryScoring.blackTerritory + gameStateManager.getCaptureCounter().black;
		const whiteScore = territoryScoring.whiteTerritory + gameStateManager.getCaptureCounter().white;

		// Add Komi to white's score
		const komi = 6.5; // You can make this dynamic based on game settings
		const finalBlackScore = blackScore;
		const finalWhiteScore = whiteScore + komi;

		// Determine winner
		let winner;
		if (finalBlackScore > finalWhiteScore) {
			winner = 'black';
		} else {
			winner = 'white';
		}

		this.endMessage.push(`Final Score - Black: ${finalBlackScore}, White: ${finalWhiteScore}`);
		this.endMessage.push(`${winner} wins the game!`);
	}

	removeDeadStones(deadStones) {
		// Remove dead stones from the board
		for (const color in deadStones) {
			deadStones[color].forEach(stone => {
				rulesControl.updateCell(stone.x, stone.y, null);
				const selector = `circle[data-x="${stone.x}"][data-y="${stone.y}"]`;
				const stoneElement = document.querySelector(selector);
				if (stoneElement) {
					stoneElement.remove(); // Removes the SVG element from the DOM
				}
			});
		}
	}
}

// Export a single instance
export const endGameManager = new EndGameManager();
