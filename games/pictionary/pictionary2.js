let easyWords = require("../../dictionary.js")


function Pictionary(players, difficulty = "easy") {
    this.players = {};
    players.forEach(player => {
       this.players[player.id] = {id: player.id, score: 0, guessed: false, ready: false}
    })
    // this.players = players.map(id => ({id: id, score: 0, guessed: false}))
    // this.players = {
    //     1: {
    //         id: 1,
    //         score: 0,
    //         guessed: false
    //     }
    // }
    this.numRounds = players.length * 2;
    this.currDrawer = players[0].id;
    this.currentRound = 0;
    this.targetWord = "";
    this.usedWords = [];
    this.timeoutId = undefined;
    this.difficulty = difficulty;
    this.callBackBetweenRounds = null;
    this.time = new Date();

    // this.readline = require('readline').createInterface({
    //     input: process.stdin,
    //     output: process.stdout
    //   })
      
}

Pictionary.prototype.getState = function(){
    return {
        players: this.players,
        currDrawer: this.currDrawer,
        targetWord: this.targetWord,
        currentRound: this.currentRound,
        rumRounds: this.numRounds
    }
}

Pictionary.prototype.setEndRound = function(cb) {
    this.callBackBetweenRounds = cb;
}


Pictionary.prototype.endRound = function() {
    clearTimeout(this.timeoutId)
    this.timeoutId = null;
    if(this.callBackBetweenRounds){
        this.callBackBetweenRounds();
    }
}

Pictionary.prototype.isOver = function() {
    this.currentRound >= this.numRounds
}



Pictionary.prototype.startRound = function() {
    if (this.currentRound < this.numRounds) {
        this.currentRound += 1;
        this.time = new Date();
        this.currDrawer = Object.keys(this.players)[(this.currentRound-1) % Object.keys(this.players).length];
        // this.currDrawer = this.players[((this.currentRound-1) % Object.keys(this.players).length)]
        //start the round
        this.generateWord()
        // this.timeoutId = setTimeout(() => this.endRound(), this.time * 1000)

        //emit the word to the drawer, emit start timer
        // this.readline.question(`Guess a word`, (word) => {
        //     this.guess(word, 1)
        //     this.readline.close()
        //   })
        // if (this.won()) {
            //     clearTimeout(this.timeoutId);
            //     this.endRound()
            // }
        }
    // until this.roundIsOver
    //goes back to startPictionary, starting next round
}

Pictionary.prototype.generateWord = function() {
    //change dictionary later 
    this.targetWord = easyWords[Math.floor(Math.random() * (easyWords.length))].word
    while (this.usedWords.includes(this.targetWord)) {
        this.targetWord = this.targetWord = easyWords[Math.floor(Math.random() * (easyWords.length))].word
    }
    // console.log(this.targetWord)
    this.usedWords.push(this.targetWord)
}


// Pictionary.prototype.won = function() {
//     //If players === Array of objects
//     if (this.players.every( (player) => player.guessed === true)) {
//         return true
//     } else {
//         return false;
//     }
// }


Pictionary.prototype.won = function() {
    //If players === Object with ID as keys
    if (Object.values(this.players).every( (player) => player.guessed === true)) {
        return true
    } else {
        return false;
    }
}

Pictionary.prototype.guess = function(word, userId) {
    if (word === this.targetWord) {
        // console.log(this.players)
        this.players[userId].guessed = true;
        // console.log("great guess!")
        this.addScore(userId)
        // this.addScore(userId)
        this.addScore(this.currDrawer)
        if (Object.values(this.players).every( (player) => player.guessed === true)) {
            //endround logic
            this.endRound()
        }
        return true;
    }
    // console.log('oops')
    return false;
}

Pictionary.prototype.receiveMessage = function(userId, message) {
    if (this.guess(message, userId)) {

    } else {

    }
}

Pictionary.prototype.addScore = function(userId) {
    this.players[userId].score += 1;
}


module.exports = Pictionary;
// let a = new Pictionary([1])
// a.startRound()