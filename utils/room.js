module.exports = class Room {
  constructor(roomId) {
    this.id = roomId;
    this.ready = false;
    this.onGame = false;
    this.players = [];
    this.game = null;
  }

  hasPlayer(user) {
    if (this.players.length === 0) return false;
    return this.players.some(player => {
      return player.id === user.id;
    });
  }

  add(user) {
    this.players.push(user);
    this.ready = false;
  }

  remove(userId) {
    console.log(this.game);
    if (this.onGame && this.game && this.game.players[userId]) {
      console.log("leave");
      this.players.forEach(player => {
        if (player.id === userId) {
          player.connected = false;
        }
      });
      return false;
    } else {
      this.players = this.players.filter(player => player.id !== userId);
      this.ready = this.isReady();
      return true;
    }
  }

  hasConnectedPlayer() {
    if (this.players.length === 0) return false;
    return this.players.some(player => player.connected);
  }

  setReady(userId) {
    this.players.forEach((user, idx) => {
      if (user.id === userId) {
        this.players[idx].ready = true;
      }
    });
    if (this.isReady()) {
      this.ready = true;
    }
  }

  isReady() {
    return this.players.every(user => user.ready);
  }

  setGame(game) {
    this.game = game;
  }

  getInfo() {
    return {
      id: this.id,
      ready: this.ready,
      onGame: this.onGame,
      players: this.players
    };
  }
};
