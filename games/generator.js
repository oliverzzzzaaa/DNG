const Pictionary = require("./pictionary/pictionary");

function createGame(type, params) {
  switch (type) {
    case "Pictionary":
      return new Pictionary(params);
    default:
      return null;
  }
}

module.exports = createGame;
