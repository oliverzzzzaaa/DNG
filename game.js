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
    this.timeoutId = undefined;
}

Game.prototype.startGame = function() {
        this.startRound()
    //emit end game
}

Game.prototype.endRound = function() {
    console.log("Round is over!")
    console.log(this.usedWords)
    if (this.currentRound < this.numRounds) {
        this.startRound()
    }
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
        this.timeoutId = setTimeout(() => this.endRound(), 1000)
        if (this.won()) {
            clearTimeout(this.timeoutId);
            this.endRound()
        }
    }
    // until this.roundIsOver
    //goes back to startGame, starting next round
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