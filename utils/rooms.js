module.exports = class Rooms {
  // rooms;

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

  create() {
    let roomId = Math.ceil(Math.random() * 10000000).toString();
    while (this.rooms.has(roomId)) {
      roomId = Math.ceil(Math.random() * 10000000).toString();
    }
    this.rooms.set(roomId, []);
    console.log(this.rooms.keys());
    return roomId;
  }

  join(roomId, user) {
    console.log(typeof this.rooms);
    const room = this.rooms.get(roomId);
    if (room) {
      room.push(user);
      this.map.set(user.id, roomId);
      return true;
    }
    return false;
  }

  leave(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      this.rooms.set(
        roomId,
        this.rooms.get(roomId).filter(user => user.id !== userId)
      );
      this.map.delete(userId);
      return roomId;
    }
    return false;
  }
};
