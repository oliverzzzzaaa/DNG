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
    room.players.forEach(player => {
      if (player.connected.status === false) {
        lobby.leaveRoom(player.id);
      }
    });
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
        }, 95000);
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

function handleCreate(socket, lobby, params) {
  const room = lobby.getRoomBySocket(socket);
  const game = new Pictionary(room.players, params[0]);
  room.setGame(game);
  lobby.emitRoomMessage(room.id, {
    type: "updateGameState",
    body: game.getState()
  });
}

function handleEndGame(socket, lobby) {
  const room = lobby.getRoomBySocket(socket);
  if (room) {
    room.reset();
    room.players.forEach(player => {
      if (player.connected.status === false) {
        lobby.leaveRoom(player.id);
      }
    });
    lobby.emit("updateRoom", room.getInfo());
  }
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
  const room = lobby.getRoomBySocket(socket);
  if (room) {
    if (room.game) {
      room.game.addstrokes(data);
    }
    lobby.emitRoomMessage(room.id, {
      type: "pathData",
      body: data
    });
  }
}

function handleClear(socket, lobby) {
  const room = lobby.getRoomBySocket(socket);
  if (room) {
    if (room.game) {
      room.game.clearstrokes();
    }
    lobby.emitRoomMessage(room.id, {
      type: "clearDrawing"
    });
  }
}

function handleGuess(socket, lobby, payload) {
  const room = lobby.getRoomBySocket(socket);
  if (room && room.game) {
    const game = room.game;
    let word = payload.word;
    const playerId = lobby.getUserId(socket);
    if (game.guess(playerId, payload.word)) {
      lobby.emitRoomMessage(room.id, {
        type: "updateGameState",
        body: room.game.getState()
      });
      if (!game.onRound && roundTimerId) {
        clearRoundTimer();
      }
      word = "*****";
    }
    lobby.emitRoomMessage(room.id, {
      type: "message",
      body: { sender: payload.sender, body: word }
    });
  }
}

function handleSetDifficulty(socket, lobby, payload) {
  const room = lobby.getRoomBySocket(socket);
  if (room) {
    room.config.difficulty = payload.difficulty;
    lobby.emitRoomMessage(room.id, {
      type: "setDifficulty",
      body: payload.difficulty
    });
  }
}

module.exports = {
  roundReady: handleRoundReady,
  create: handleCreate,
  getState: handleGetState,
  pathData: handlePathData,
  clearDrawing: handleClear,
  guess: handleGuess,
  setDifficulty: handleSetDifficulty,
  endGame: handleEndGame
};
