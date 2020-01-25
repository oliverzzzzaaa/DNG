const UserManagement = require("../utils/userManagement");
const Rooms = require("../utils/rooms");
const GameManagement = require("../utils/gameManagement");
const pictionaryHandler = require("./pictionary/handler");

function handleGameAction(socket, payload) {
  let handler;
  switch (payload.game) {
    case "Pictionary":
      handler = pictionaryHandler[payload.type];
      break;
    default:
      break;
  }
  handler(
    socket,
    UserManagement,
    Rooms.getInstance(),
    GameManagement,
    payload.params
  );
}

module.exports = handleGameAction;
