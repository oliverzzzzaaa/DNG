module.exports = class Rooms {
  rooms;

  constructor() {
    this.rooms = new Map();
    this.map = new Map();
    Rooms.rooms = this;
  }

  static getInstance() {
    if (this.rooms) {
      return this.rooms;
    }
    return new Rooms();
  }

  get(id) {
    return this.rooms.get(id);
  }

  getRooms() {
    // const rooms = {};
    // for (let [key, value] of this.rooms.entries()) {
    //   rooms[key] = { id: key, players: value };
    // }
    return Object.fromEntries(this.rooms);
  }

  getRoomByPlayer(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      return this.rooms.get(roomId);
    }
    return null;
  }

  create() {
    let roomId = Math.ceil(Math.random() * 10000000).toString();
    while (this.rooms.has(roomId)) {
      roomId = Math.ceil(Math.random() * 10000000).toString();
    }
    this.rooms.set(roomId, {
      id: roomId,
      ready: false,
      onGame: false,
      players: []
    });
    return roomId;
  }

  join(roomId, user) {
    const room = this.rooms.get(roomId);
    if (room) {
      if (
        room.players.every(player => {
          console.log(typeof player.id);
          console.log(typeof user.id);

          return player.id !== user.id;
        })
      ) {
        room.players.push(user);
      }
      this.map.set(user.id.toString(), roomId);
      return true;
    }
    return false;
  }

  leave(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      const room = this.rooms.get(roomId);
      let empty = false;
      if (room.onGame) {
        if (room.players.length < 2) {
          this.rooms.delete(roomId);
          empty = true;
        }
      } else {
        const players = room.players.filter(
          user => user.id.toString() !== userId
        );
        room.players = players;
        this.map.delete(userId);
        if (room.players.length < 1) {
          this.rooms.delete(roomId);
          empty = true;
        }
      }
      return { id: roomId, isEmpty: empty };
    }
    return null;
  }
};
