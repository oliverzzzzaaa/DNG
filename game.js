// import {easyWords} from './dictionary'
let easyWords = require("./dictionary.js")

function Game(players) {
    this.players = players;
    this.numRounds = players.length * 2;
    this.currDrawer = players[0].id;
    this.currentRound = 0;
    this.targetWord = "";
    this.time = 60;
    this.usedWords = [];
    this.intervalId = null;
}

Game.prototype.startGame = function() {
    while (this.currentRound < this.numRounds) {
        this.startRound()
    }
    //emit end game
}

Game.prototype.startRound = function() {
    if (this.currentRound < this.numRounds) {
        this.currentRound += 1;
        this.currDrawer = this.players[(this.currentRound % this.players.length)].id
        //start the round
        this.targetWord = easyWords[Math.floor(Math.random() * 49)]
        while (this.usedWords.includes(this.targetWord)) {
            this.targetWord = this.targetWord = easyWords[Math.floor(Math.random() * 49)]
        }
        // console.log(this.targetWord)
        this.usedWords.push(this.targetWord)
        //emit the word to the drawer, emit start timer
        console.log(this.usedWords)
        this.intervalId = setInterval(this.tick, 1000)
    }
    // until this.roundIsOver
    //goes back to startGame, starting next round
}

Game.prototype.tick = function() {
    if (this.time > 0) {
        this.time -=1;
        console.log(this.time);
    }
}

Game.prototype.won = function() {
    //If players === Array of objects
    if (this.players.every( (player) => player.guessed === true)) {
        return true
    } else {
        return false;
    }
}
// Game.prototype.wonRound = function() {
//     //If players === Object with ID as keys
//     if (Object.values(this.players).every( (player) => player.guessed === true)) {
//         return true
//     } else {
//         return false;
//     }
// }

Game.prototype.roundIsOver = function() {
    if (this.wonRound() || this.time === 0) {
        clearInterval(this.intervalId)
        return true;
    } else {
        return false;
    }
}



Game.prototype.receiveMessage = function(userId, message) {
    if (message === this.targetWord) {
        //add score and censor word
        this.addScore(userId)
        this.addScore(this.currDrawer)
        return "*****"
        //emit new score to everyone
    } else {
        return message
    }
}

Game.prototype.addScore = function(userId) {
    this.players[userId].score += 1;
}



let a = new Game([
    {id: 1, name: "Oliver", score: 0, guessed: false},
    {id: 2, name: "Johnson", score: 0, guessed: false},
    {id: 3, name: "GY", score: 0, guessed: false},
    {id: 4, name: "Yin", score: 0, guessed: false},
]);
a.startGame()