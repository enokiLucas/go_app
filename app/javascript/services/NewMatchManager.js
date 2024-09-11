class NewMatchManager {
	constructor() {
		this.newMatchSettings = {
			boardSize: 9,
			playAs: 'black',
			difficult: 1,
			whiteHandicap: 0,
			komi: 6.5,
			ai_player: true
		};
	}

	updateNewMatchSettings(key, value) {
		this.newMatchSettings[key] = value;
		console.log(this.newMatchSettings[key]);
	}

	getNewMatchSettings() {
		return this.newMatchSettings;
	}
}

// Export a single instance
export const newMatchManager = new NewMatchManager();
