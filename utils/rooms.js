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
    this.rooms.set(roomId, { id: roomId, onGame: false, players: [] });
    return roomId;
  }

  join(roomId, user) {
    console.log(typeof this.rooms);
    const room = this.rooms.get(roomId);
    if (room) {
      room.players.push(user);
      this.map.set(user.id, roomId);
      return true;
    }
    return false;
  }

  leave(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      // this.rooms.set(
      //   roomId,
      //   this.rooms.get(roomId).filter(user => user.id !== userId)
      // );
      this.rooms.players = this.rooms.players.filter(
        user => user.id !== userId
      );
      this.map.delete(userId);
      if (this.rooms.get(roomId).players.length < 1) {
        this.rooms.delete(roomId);
      }
      return roomId;
    }
    return false;
  }
};
