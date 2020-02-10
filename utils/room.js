module.exports = class Room {
  constructor(roomId) {
    this.id = roomId;
    this.ready = false;
    this.onGame = false;
    this.players = [];
    this.game = null;
    this.config = {};
  }

  hasPlayer(user) {
    if (this.players.length === 0) return false;
    return this.players.some(player => {
      if (player.id === user.id) {
        player.connected.status = true;
      }
      return player.id === user.id;
    });
  }

  reset() {
    this.players.forEach(user => {
      user.ready = false;
    });
    this.ready = false;
    this.onGame = false;
    this.game = null;
  }

  add(user) {
    this.players.push(user);
    this.ready = false;
  }

  remove(userId) {
    if (this.onGame && this.game && this.game.players[userId]) {
      this.players.forEach(player => {
        if (player.id === userId) {
          player.connected.status = false;
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
    return this.players.some(player => player.connected.status);
  }

  setUnready(userId) {
    this.players.forEach((user, idx) => {
      if (user.id === userId) {
        this.players[idx].ready = false;
      }
    })
    this.ready = false;
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
    return this.players.every(user => user.ready) && this.players.length >= 2;
  }

  setGame(game) {
    this.game = game;
  }

  getInfo() {
    return {
      id: this.id,
      ready: this.ready,
      onGame: this.onGame,
      players: this.players,
      config: this.config
    };
  }
};
