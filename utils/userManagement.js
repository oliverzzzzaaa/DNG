module.exports = class Connection {
  constructor() {
    this.loggedInUsers = new Map();
    this.connectedSockets = new Map();
  }

  connect(userId, socket) {
    if (typeof userId !== "string") {
      userId = userId.toString();
    }
    this.loggedInUsers.set(userId, socket);

    const socketId = socket.id.toString();
    this.connectedSockets.set(socketId, userId);
  }

  disconnect(socket) {
    const socketId = socket.id.toString();
    const userId = this.connectedSockets.get(socketId);
    this.connectedSockets.delete(socketId);
    this.loggedInUsers.delete(userId);
  }

  getSocket(userId) {
    if (typeof userId !== "string") {
      userId = userId.toString();
    }
    return this.loggedInUsers.get(userId);
  }

  getUserId(socket) {
    return this.connectedSockets.get(socket.id.toString());
  }

  getConnectedSockets() {
    return Array.from(this.loggedInUsers.values());
  }
};
