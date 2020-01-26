module.exports = class Player {
  constructor(user) {
    this.id = user._id.toString();
    this.image = user.image
      ? user.image
      : "http://calligraphyalphabet.org/wp-content/uploads/roman-calligraphy-alphabet-o.jpg";
    this.name = user.username;
    this.ready = false;
    this.connected = true;
  }
};
