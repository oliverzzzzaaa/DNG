const Connection = require("./userManagement");
const Room = require("./room");

class Lobby {
  constructor() {
    this.rooms = new Map();
    this.map = new Map();
    this.connection = new Connection();
  }

  login(userId, socket) {
    this.connection.connect(userId, socket);
  }

  logout(socket) {
    this.connection.disconnect(socket);
  }

  getUserId(socket) {
    return this.connection.getUserId(socket);
  }

  getRooms() {
    return Object.fromEntries(this.rooms);
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  getRoomIdBySocket(socket) {
    const playerId = this.connection.getUserId(socket);
    return this.map.get(playerId);
  }

  getRoomBySocket(socket) {
    const playerId = this.connection.getUserId(socket);
    const roomId = this.map.get(playerId);
    if (roomId) {
      return this.rooms.get(roomId);
    }
    return null;
  }

  setUserReadyBySocket(socket) {
    const playerId = this.connection.getUserId(socket);
    const room = this.getRoomBySocket(socket);
    if (room) {
      room.setReady(playerId);
      return room.isReady();
    }
    return false;
  }

  setUserUnReadyBySocket(socket) {
    const playerId = this.connection.getUserId(socket);
    const room = this.getRoomBySocket(socket);
    if (room) {
      room.setUnready(playerId)
    }
    return false;
  }

  emit(type, body) {
    this.connection
      .getConnectedSockets()
      .forEach(socket => socket.emit(type, body));
  }

  emitRoomMessage(roomId, message) {
    const room = this.rooms.get(roomId);
    if (room) {
      // room.players.forEach(player => {
      //   this.connection.getSocket(player.id).emit(message.type, message.body);
      // });
      for (let i = 0; i < room.players.length; i++) {
        const socket = this.connection.getSocket(room.players[i].id);
        if (socket) {
          socket.emit(message.type, message.body);
        }
      }
    }
  }

  createRoom() {
    let roomId = Math.ceil(Math.random() * 10000000).toString();

    while (this.rooms.has(roomId)) {
      roomId = Math.ceil(Math.random() * 10000000).toString();
    }

    const room = new Room(roomId);
    this.rooms.set(roomId, room);
    return room;
  }

  joinRoom(roomId, user) {
    const room = this.rooms.get(roomId);
    if (room) {
      if (!room.hasPlayer(user)) {
        room.add(user);
        this.map.set(user.id.toString(), roomId);
      }
      return true;
    }
    return false;
  }

  leaveRoom(userId) {
    const roomId = this.map.get(userId);
    if (roomId) {
      const room = this.rooms.get(roomId);
      if (room) {
        if (room.remove(userId)) {
          this.map.delete(userId);
        }
        const hasPlayer = room.hasConnectedPlayer();
        if (!hasPlayer) {
          this.rooms.delete(roomId);
        }
        return { id: roomId, isEmpty: !hasPlayer };
      }
    }
    return null;
  }

  disconnectFromRoom(socket) {
    const userId = this.connection.getUserId(socket);
    return this.leaveRoom(userId);
  }
}

const lobby = new Lobby();

module.exports = lobby;
