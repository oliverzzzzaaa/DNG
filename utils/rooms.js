module.exports = class Rooms {
  rooms; // instance of Rooms class

  constructor() {
    this.rooms = new Map();
    this.map = new Map();
    Rooms.rooms = this;
  }

  static getInstance() {
    if (this.rooms) {
      return this.rooms;
    }
    return new Rooms(); // only run at the first time
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
      room.players.push(user);
      this.map.set(user.id.toString(), roomId);
      return true;
    }
    return false;
  }

  leave(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      const players = this.rooms
        .get(roomId)
        .players.filter(user => user.id.toString() !== userId);
      this.rooms.get(roomId).players = players;
      this.map.delete(userId);
      let empty = false;
      if (this.rooms.get(roomId).players.length < 1) {
        this.rooms.delete(roomId);
        empty = true;
      }
      return { id: roomId, isEmpty: empty };
    }
    return null;
  }
};


