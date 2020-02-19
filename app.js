const express = require("express");
const app = express();
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const rooms = require("./routes/api/rooms");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 5000;
const path = require("path");
const handleGameAction = require("./games/gameHandler");
const lobby = require("./utils/lobby");
let db;
if (process.env.NODE_ENV === "production") {
  db = require("./config/keys_prod").mongoURI;
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  db = require("./config/keys").mongoURI;
}

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/users", users);
app.use("/rooms", rooms);

io.on("connection", socket => {
  console.log("new client connected");
  socket.on("login", payload => {
    lobby.login(payload.userId, socket);
  });

  socket.on("getRooms", () => {
    const roomId = lobby.getRoomIdBySocket(socket);
    socket.emit("lobby", {
      rooms: lobby.getRooms(),
      roomId: roomId
    });
  });

  socket.on("lobbyMessage", data => {
    lobby.emit("lobbyMessage", data);
  });

  socket.on("roomMessage", data => {
    const roomId = lobby.getRoomIdBySocket(socket);
    lobby.emitRoomMessage(roomId, {
      type: "roomMessage",
      body: data
    });
  });

  socket.on("ready", () => {
    const room = lobby.getRoomBySocket(socket);
    if (room) {
      lobby.setUserReadyBySocket(socket);
      lobby.emitRoomMessage(room.id, {
        type: "updateRoom",
        body: room.getInfo()
      });
    }
  });

  socket.on("unready", () => {
    const room = lobby.getRoomBySocket(socket);
    if (room) {
      lobby.setUserUnReadyBySocket(socket);
      lobby.emitRoomMessage(room.id, {
        type: "updateRoom",
        body: room.getInfo()
      });
    }
  });

  // socket.on('difficulty', () => {
  //   const room = lobby.getRoomBySocket(socket);
  //   lobby.emitRoomMessage(room.id, {
  //     type: "updateRoom",
  //     body: room.getInfo()
  //   });
  // });

  socket.on("startGame", data => {
    const room = lobby.getRoomBySocket(socket);
    room.onGame = true;
    handleGameAction(socket, lobby, {
      game: data.game,
      type: "create",
      params: [data.difficulty]
    });
    lobby.emit("updateRoom", room.getInfo());
  });

  socket.on("gameAction", payload => {
    handleGameAction(socket, lobby, payload);
  });

  socket.on("disconnect", () => {
    const roomInfo = lobby.disconnectFromRoom(socket);
    if (roomInfo) {
      if (!roomInfo.isEmpty) {
        lobby.emit("updateRoom", lobby.getRoom(roomInfo.id).getInfo());
      } else {
        lobby.emit("removeRoom", { id: roomInfo.id });
      }
    }
    lobby.logout(socket);
    console.log("Client disconnected");
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
