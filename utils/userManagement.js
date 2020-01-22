module.exports = class UserManagement {
  loggedInUsers;
  connectedSockets;

  static setup() {
    this.loggedInUsers = new Map();
    this.connectedSockets = new Map();
  }

  static login(userId, socket) {
    if (this.loggedInUsers === undefined) {
      this.setup();
    }
    this.loggedInUsers.set(userId, socket);
    this.connectedSockets.set(socket.id, userId);
  }

  static logout(socketId) {
    if (this.loggedInUsers === undefined) {
      this.setup();
    }
    const userId = this.connectedSockets.get(socketId);
    this.connectedSockets.delete(socketId);
    this.loggedInUsers.delete(userId);
  }

  static getSocket(userId) {
    if (this.loggedInUsers === undefined) {
      this.setup();
    }
    return this.loggedInUsers.get(userId);
  }

  static getConnectedSocket() {
    if (this.loggedInUsers === undefined) {
      this.setup();
    }
    return Array.from(this.loggedInUsers.values());
  }
};
