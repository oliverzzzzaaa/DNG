
function Game(players) {
    this.players = players;
    this.numRounds = players.length * 2;
    this.currDrawer = players[0].id;
    this.currentRound = 0;
    this.targetWord = ""
}

Game.prototype.startRound = function() {
    if (this.currentRound !== 0) {
        this.currentRound += 1;
        this.currDrawer = players[(this.currentRound % this.players.length)].id
    }

}

Game.prototype.receiveMessage = function(userId, message) {
    if (message === this.targetWord) {
        //add score and censor word
        return "*****"
    } else {
        return message
    }
}
