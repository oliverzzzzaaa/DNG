const app = require("express")();
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 5000;
const UserManagement = require("./utils/userManagement");
const Rooms = require("./utils/rooms");
const Pictionary = require("./game");
const GameManagement = require("./utils/gameManagement")


// room = {
//   id: 1,
//   ready: false,
//   onGame: false,
//   players: [
//     {id: 1, name: 'oliver', image: 'abc'}
//   ],
//   gameState: {
//     players: [
//       {id: 1,
//       score: 0,
//       name: 'oliver',
//       guessed: false
//         }
//     ]
//   }
// }


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", users);
app.use("/rooms", rooms);

const loggedInUsers = [];

function getRoomBySocketId(id) {
  const playerId = UserManagement.getUserId(id);
  const rooms = Rooms.getInstance();
  return rooms.getRoomByPlayer(playerId);
}

io.on("connection", socket => {
  loggedInUsers.push(socket);
  console.log("New client connected");

  socket.on("start", (data) => {
    let game;
    const room = getRoomBySocketId(socket.id);
    if (data.game === "Pictionary") {
      game = new Pictionary()
    }
    room.forEach(user => {
      //TODO: change gameState to real game state
      UserManagement.getSocket(user.id).emit("start", { gameState: room });
    });
  });

  socket.on("ready", () => {
    const playerId = UserManagement.getUserId(socket.id);
    const room = getRoomBySocketId(socket.id);
    room.players.map(player => {
      if (player.id.toString() === playerId) {
        player.ready = true;
      }
      return player;
    });
    if (room.players.every(player => player.ready)) {
      room.ready = true;
    }
    room.players.forEach(user => {
      //TODO: change gameState to real game state
      UserManagement.getSocket(user.id.toString()).emit("updateRoom", room);
    });
  });

  socket.on("startGame", (data) => {
    const room = getRoomBySocketId(socket.id);
    room.onGame = true;
    if (data.game === "Pictionary") {
      let game = new Pictionary(room.players)
      GameManagement.set(room.id, game);
      socket.emit("startReady")
    }
  });

  socket.on("roundReady", data => {
    const room = getRoomBySocketId(socket.id)
    const userId = UserManagement.getUserId(socket.id.toString())
    const game = GameManagement.get(room.id)
    game.players[userId].ready = true
    //if user is connnected and ready
    if (Object.keys(game.players).every( player => {
      player.ready === true && room.players[player.id].connected
    }
      )) {
      startRound(room, game)
    }
  })

  let startRound = (room, game) => {
    game.startRound()
    //create new word and set currDrawer
    updateRoom(room, game)
    let timeoutId = setTimeout(() => endRound(room, game), game.time * 1000)

  }

  let endRound = (room, game) => {
    game.currDrawer = null;
    room.gameState = game.state()
    room.players.forEach( player => {
      UserManagement.getSocket(player.id.toString()).emit("updateRoom", room)
    })
  }

  const updateRoom = (room, game)  => {
    room.gameState = game.state()
    room.players.forEach( player => {
      UserManagement.getSocket(player.id.toString()).emit("updateRoom", room);
    })
  }

  socket.on("roundReady", () => {
    
  })

  // socket.on("gameAction", (data) => {
  //   switch (data.type) {
  //     case value:
    
  //     default:

  //   }
  // })

  socket.on("login", payload => {
    UserManagement.login(payload.userId, socket);
    socket.emit("loggedIn", {
      rooms: Rooms.getInstance().getRooms()
    });
  });

  socket.on("WELCOME", () =>
    socket.emit("WELCOME", {
      msg: "Welcome, you are connecting to server now."
    })
  );

  //{tpye: "reday" , payload: data}
  socket.on("message", data => {});

  socket.on("SOMEACTIONTYPE", () =>
    socket.emit("SOMERESPONSETYPE", {
      msg: "If you getting this, that means server received your msg"
    })
  );

  socket.on("pathData", data => {
    loggedInUsers.forEach(sk => {
      sk.emit("pathData", data);
    });
  });

  socket.on("clearDrawing", () => {
    loggedInUsers.forEach(sk => {
      sk.emit("clearDrawing");
    });
  });

  socket.on("disconnect", () => {
    const playerId = UserManagement.getUserId(socket.id.toString());
    if (playerId) {
      const roomInfo = Rooms.getInstance().leave(playerId.toString());
      if (roomInfo) {
        if (!roomInfo.isEmpty) {
          UserManagement.getConnectedSocket().forEach(socket => {
            socket.emit("updateRoom", Rooms.getInstance().get(roomInfo.id));
          });
        } else {
          UserManagement.getConnectedSocket().forEach(socket => {
            socket.emit("removeRoom", {
              id: roomInfo.id
            });
          });
        }
      }
    }
    UserManagement.logout(socket.id);
    console.log("Client disconnected");
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
