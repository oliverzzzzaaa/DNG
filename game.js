// Game is server?


// players = {
//     1: {
//         id: 1,
//         name: "Oliver",
//         score: 0,
//         guessed: true
//     },
//     2: {
//         id: 2,
//         name: "Yin",
//         score: 1,
//         guessed: false
//     }
// }
import {easyWords} from './dictionary'


function Game(players) {
    this.players = players;
    this.numRounds = players.length * 2;
    this.currDrawer = players[0].id;
    this.currentRound = 0;
    this.targetWord = "";
    this.time = 60;
    this.usedWords = [];
}

Game.prototype.startGame = function() {
    while (this.currentRound < this.numRounds) {
        this.startRound()
    }
}

Game.prototype.startRound = function() {
    if (this.currentRound !== 0) {
        this.currentRound += 1;
        this.currDrawer = players[(this.currentRound % this.players.length)].id
        //start the round
        this.targetWord = easyWords[Math.floor(Math.random() * 49)]
        while (this.usedWords.includes(this.targetWord)) {
            this.targetWord = this.targetWord = easyWords[Math.floor(Math.random() * 49)]
        }
        //emit the words
    }

}

Game.prototype.tick = function() {
    if (this.time > 0) {
        this.time -=1;
    }
}

// Game.prototype.won = function() {
//     //If players === Array of objects
//     if (this.players.every( (player) => player.guessed === true)) {
//         return true
//     } else {
//         return false;
//     }
// }
Game.prototype.won = function() {
    //If players === Object with ID as keys
    if (Object.values(this.players).every( (player) => player.guessed === true)) {
        return true
    } else {
        return false;
    }
}

Game.prototype.isOver = function() {
    if (this.won() || this.time === 0) {
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
    } else {
        return message
    }
}

Game.prototype.addScore = function(userId) {
    this.players[userId].score += 1;
}
