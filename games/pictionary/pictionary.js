let easyWords = require("../../dictionary.js");

module.exports = class Pictionary {
  constructor(users, difficulty = "easy") {
    this.players = {};
    users.forEach(user => {
      this.players[user.id] = {
        id: user.id,
        score: 0,
        guessed: false,
        ready: false
      };
    });
    this.numRounds = this.players.length * 2;
    this.currDrawer = Object.values(this.players)[0].id;
    this.currentRound = 0;
    this.targetWord = "";
    this.usedWords = [];
    this.difficulty = difficulty;
    this.roundStartTime;
    this.onRound = false;
  }

  generateWord() {
    this.targetWord =
      easyWords[Math.floor(Math.random() * easyWords.length)].word;
    while (this.usedWords.includes(this.targetWord)) {
      this.targetWord = this.targetWord =
        easyWords[Math.floor(Math.random() * easyWords.length)].word;
    }
    this.usedWords.push(this.targetWord);
  }

  readyPlayer(playerId) {
    console.log(playerId);
    this.players[playerId].ready = true;
  }

  isReady() {
    const players = Object.values(this.players);
    return players.every(player => player.ready);
  }

  startRound() {
    this.generateWord();
    this.roundStartTime = Date.now();
    this.onRound = true;
  }

  endRound() {
    this.onRound = false;
    const players = Object.values(this.players);
    players.forEach(player => (player.ready = false));
  }

  getState() {
    return {
      players: this.players,
      currDrawer: this.currDrawer,
      targetWord: this.targetWord,
      currentRound: this.currentRound,
      rumRounds: this.numRounds,
      roundStartTime: this.roundStartTime,
      onRound: this.onRound
    };
  }
};
