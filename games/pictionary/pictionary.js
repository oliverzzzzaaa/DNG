let words = require("../../dictionary.js");

module.exports = class Pictionary {
  constructor(users, difficulty = "easy") {
    this.players = {};
    users.forEach(user => {
      this.players[user.id] = {
        id: user.id,
        score: 0,
        guessed: false,
        ready: false,
        name: user.name
      };
    });
    this.numRounds = Object.keys(this.players).length * 2;
    this.currentRound = 0;
    this.currDrawer = Object.values(this.players)[0].id;
    this.targetWord = "";
    this.usedWords = [];
    this.difficulty = difficulty;
    this.roundStartTime;
    this.onRound = false;
    this.strocks = [];
  }

  switchTurn() {
    this.currDrawer = Object.values(this.players)[
      this.currentRound % Object.keys(this.players).length
    ].id;
  }

  generateWord() {
    let wordbank = null;
    switch (this.difficulty) {
      case "easy":
        wordbank = words.easyWords;
        break;
      case "medium":
        wordbank = words.mediumWords;
        break;
      case "hard":
        wordbank = words.hardWords;
        break;
      default:
        wordbank = words.easyWords;
        break;
    }
    console.log(this.wordbank);
    this.targetWord =
      wordbank[Math.floor(Math.random() * wordbank.length)].word;
    while (this.usedWords.includes(this.targetWord)) {
      this.targetWord = this.targetWord =
        wordbank[Math.floor(Math.random() * wordbank.length)].word;
    }
    this.usedWords.push(this.targetWord);
  }

  readyPlayer(playerId) {
    this.players[playerId].ready = true;
  }

  guess(playerId, word) {
    if (this.players[playerId] && playerId !== this.currDrawer) {
      if (this.targetWord === word) {
        this.players[playerId].guessed = true;
        this.players[playerId].score += 1;
        this.players[this.currDrawer].score += 1;
        if (this.shouldEndround()) {
          this.endRound();
        }
        return true;
      }
    }
    return false;
  }

  isReady() {
    const players = Object.values(this.players);
    return players.every(player => player.ready);
  }

  shouldEndround() {
    const players = Object.values(this.players);
    return players.every(
      player => player.id === this.currDrawer || player.guessed
    );
  }

  startRound(time = 60000) {
    this.generateWord();
    const players = Object.values(this.players);
    players.forEach(player => (player.guessed = false));
    this.roundStartTime = Date.now();
    this.onRound = true;
    this.switchTurn();
  }

  endRound() {
    this.onRound = false;
    const players = Object.values(this.players);
    players.forEach(player => (player.ready = false));
    this.currentRound++;
    this.clearStrocks();
  }

  isOver() {
    return this.currentRound === this.numRounds;
  }

  addStrocks(strock) {
    this.strocks.push(strock);
  }

  clearStrocks() {
    this.strocks = [];
  }

  getState() {
    return {
      players: this.players,
      currDrawer: this.currDrawer,
      targetWord: this.targetWord,
      currentRound: this.currentRound,
      numRounds: this.numRounds,
      roundStartTime: this.roundStartTime,
      onRound: this.onRound,
      strocks: this.strocks
    };
  }
};
