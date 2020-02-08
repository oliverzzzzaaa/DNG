const lobby = require("../utils/lobby");
const pictionaryHandler = require("./pictionary/handler");

function handleGameAction(socket, lobby, payload) {
  let handler;
  switch (payload.game) {
    case "Pictionary":
      handler = pictionaryHandler[payload.type];
      break;
    default:
      break;  
  }
  handler(socket, lobby, payload.params);
}

module.exports = handleGameAction;
