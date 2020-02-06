module.exports = class Player {
  constructor(user) {
    this.id = user._id.toString();
    this.image = user.image;
    this.name = user.username;
    this.ready = false;
    this.connected = { status: true };
  }
};
