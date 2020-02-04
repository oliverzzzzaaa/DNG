const Pictionary = require("./pictionary");

let roundTimerId;
function setRoundTimer(cb, time) {
  roundTimerId = this.setTimeout(cb, time);
}

function clearRoundTimer() {
  roundTimerId = this.clearTimeout(roundTimerId);
}

function handleRoundReady(socket, lobby, params) {
  const room = lobby.getRoomBySocket(socket);
  let game;
  if (room) {
    game = room.game;
  }
  if (game && game.isOver()) {
    room.reset();
    setTimeout(() => lobby.emit("updateRoom", room.getInfo()), 5000);
  } else {
    if (game && !game.onRound) {
      game.readyPlayer(lobby.getUserId(socket));
      if (game.isReady()) {
        game.startRound();
        setRoundTimer(() => {
          game.endRound();
          const state = game.getState();
          state.onMidRound = true;
          lobby.emitRoomMessage(room.id, {
            type: "updateGameState",
            body: state
          });
        }, 60000);
      }
      lobby.emitRoomMessage(room.id, {
        type: "clearDrawing"
      });
      lobby.emitRoomMessage(room.id, {
        type: "updateGameState",
        body: game.getState()
      });
    }
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
  const room = lobby.getRoomBySocket(socket);
  if (room && room.game) {
    const game = room.game;
    const playerId = lobby.getUserId(socket);
    if (game.guess(playerId, payload.word)) {
      lobby.emitRoomMessage(room.id, {
        type: "updateGameState",
        body: room.game.getState()
      });
      if (!game.onRound && roundTimerId) {
        clearRoundTimer();
      }
    }
    lobby.emitRoomMessage(room.id, {
      type: "message",
      body: { sender: payload.sender, body: payload.word }
    });
  }
}

module.exports = {
  roundReady: handleRoundReady,
  create: handleCreate,
  getState: handleGetState,
  pathData: handlePathData,
  clearDrawing: handleClear,
  guess: handleGuess
};
