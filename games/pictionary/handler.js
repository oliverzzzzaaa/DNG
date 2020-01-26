const Pictionary = require("./pictionary");

function handleRoundReady(socket, lobby, params) {
  // const playerId = UserManagement.getUserId(socket.id);
  // const room = Rooms.getRoomByPlayer(playerId);
  // const game = GameManagement.get(room.id);
  // room.players.forEach(user => {
  //   UserManagement.getSocket(user.id.toString()).emit("gameAction", {
  //     type: "updateGameState",
  //     state: game.state()
  //   });
  // });
}

function handleCreate(socket, lobby) {
  const room = lobby.getRoomBySocket(socket);
  const game = new Pictionary(room.players);
  room.setGame(game);
  lobby.emitRoomMessage(room.id, {
    type: "updateGameState",
    body: game.getState()
  });
}

function handleGetState(socket, lobby) {
  const room = lobby.getRoomBySocket(socket);
  if (room) {
    let state;
    if (room.game) {
      state = room.game.getState();
    }
    lobby.emitRoomMessage(room.id, {
      type: "updateGameState",
      body: state
    });
  }
}

module.exports = {
  roundReady: handleRoundReady,
  create: handleCreate,
  getState: handleGetState
};
