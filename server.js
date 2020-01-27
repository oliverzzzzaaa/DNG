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
const handleGameAction = require("./games/gameHandler");
const lobby = require("./utils/lobby");
const path = require("path")
const express = require ('express')


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/public'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  })
}

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", users);
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

  socket.on("ready", () => {
    const room = lobby.getRoomBySocket(socket);
    lobby.setUserReadyBySocket(socket);
    lobby.emitRoomMessage(room.id, {
      type: "updateRoom",
      body: room.getInfo()
    });
  });

  socket.on("startGame", data => {
    const room = lobby.getRoomBySocket(socket);
    room.onGame = true;
    handleGameAction(socket, lobby, { game: data.game, type: "create" });
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

http.listen(port, () => console.log(`Listening on port ${port}`));
