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
        name: user.name,
        connected: user.connected
      };
    });
    this.numRounds = Object.keys(this.players).length * 2;
    this.currentRound = 0;
    this.currDrawer = Object.values(this.players)[0].id;
    this.currDrawerIdx = 0;
    this.targetWord = "";
    this.usedWords = [];
    this.difficulty = difficulty;
    this.roundStartTime;
    this.onRound = false;
    this.strokes = [];
    this.nextPoint = Object.values(this.players).length;
    this.maxPoints = Object.values(this.players).length;
  }

  switchTurn() {
    const players = Object.values(this.players);
    this.currDrawer = players[0].id;
    for (let i = 0; i < players.length; i++) {
      const nextPlayerIdx = (this.currDrawerIdx + i) % players.length;
      if (players[nextPlayerIdx].connected.status) {
        this.currDrawerIdx = nextPlayerIdx;
        this.currDrawer = players[nextPlayerIdx].id;
        break;
      }
    }
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
    this.targetWord =
      wordbank[Math.floor(Math.random() * wordbank.length)].word;
    while (this.usedWords.includes(this.targetWord)) {
      this.targetWord = this.targetWord =
        wordbank[Math.floor(Math.random() * wordbank.length)].word;
    }
    this.usedWords.push(this.targetWord);
  }

  readyPlayer(playerId) {
    if (this.players[playerId]) {
      this.players[playerId].ready = true;
    }
  }

  guess(playerId, word) {
    if (this.players[playerId] && playerId !== this.currDrawer) {
      if (this.targetWord.toLowerCase() === word.toLowerCase()) {
        if (!this.players[playerId].guessed) {
          this.players[playerId].score += this.nextPoint;
          this.players[this.currDrawer].score += this.nextPoint;
          this.nextPoint -=1;
        }
        this.players[playerId].guessed = true;
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
    return players.every(player => !player.connected.status || player.ready);
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
    this.nextPoint = this.maxPoints;
    const players = Object.values(this.players);
    players.forEach(player => (player.ready = false));
    this.currentRound++;
    this.currDrawerIdx++;
    this.clearstrokes();
  }

  isOver() {
    return this.currentRound === this.numRounds;
  }

  addstrokes(stroke) {
    this.strokes.push(stroke);
  }

  clearstrokes() {
    this.strokes = [];
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
      strokes: this.strokes
    };
  }
};
