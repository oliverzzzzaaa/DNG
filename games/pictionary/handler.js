const Pictionary = require("./pictionary");

function handleRoundReady(socket, lobby, params) {
  const room = lobby.getRoomBySocket(socket);
  let game;
  if (room) {
    game = room.game;
  }
  if (game && !game.onRound) {
    game.readyPlayer(lobby.getUserId(socket));
    if (game.isReady()) {
      game.startRound();
    }
    lobby.emitRoomMessage(room.id, {
      type: "updateGameState",
      body: game.getState()
    });
    setTimeout(() => {
      game.endRound();
      lobby.emitRoomMessage(room.id, {
        type: "updateGameState",
        body: game.getState()
      });
    }, 60000);
  }
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

function handlePathData(socket, lobby, data) {
  const roomId = lobby.getRoomIdBySocket(socket);
  lobby.emitRoomMessage(roomId, {
    type: "pathData",
    body: data
  });
}

function handleClear(socket, lobby) {
  const roomId = lobby.getRoomIdBySocket(socket);
  lobby.emitRoomMessage(roomId, {
    type: "clearDrawing"
  });
}

function handleGuess(socket, lobby, payload) {
  console.log(payload);
  
}

module.exports = {
  roundReady: handleRoundReady,
  create: handleCreate,
  getState: handleGetState,
  pathData: handlePathData,
  clearDrawing: handleClear,
  guess: handleGuess
};
