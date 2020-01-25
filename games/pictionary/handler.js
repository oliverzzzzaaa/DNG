const Pictionary = require("./pictionary");

function handleRoundReady(
  socket,
  UserManagement,
  Rooms,
  GameManagement,
  params
) {
  const playerId = UserManagement.getUserId(socket.id);
  const room = Rooms.getRoomByPlayer(playerId);
  const game = GameManagement.get(room.id);
  room.players.forEach(user => {
    UserManagement.getSocket(user.id.toString()).emit("gameAction", {
      type: "updateGameState",
      state: game.state()
    });
  });
}

function handleCreate(socket, UserManagement, Rooms, GameManagement, params) {
  const playerId = UserManagement.getUserId(socket.id);
  const room = Rooms.getRoomByPlayer(playerId);
  const game = new Pictionary(room.players);
  GameManagement.set(room.id, game);
  room.players.forEach(user => {
    UserManagement.getSocket(user.id.toString()).emit("updateRoom", room);
  });
}

module.exports = {
  roundReady: handleRoundReady,
  create: handleCreate
};
