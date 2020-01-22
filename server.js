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

  socket.on("start", () => {
    const room = getRoomBySocketId(socket.id);
    room.forEach(user => {
      //TODO: change gameState to real game state
      UserManagement.getSocket(user.id).emit("start", { gameState: room });
    });
  });

  socket.on("ready", () => {
    const playerId = UserManagement.getUserId(id);
    const room = getRoomBySocketId(socket.id);
    room.map(player => {
      if (player.id === playerId) {
        player.ready = true;
      }
      return player;
    });
    room.forEach(user => {
      //TODO: change gameState to real game state
      UserManagement.getSocket(user.id).emit("gameState", { gameState: room });
    });
  });

  socket.on("login", payload => {
    UserManagement.login(payload.userId, socket);
  });

  socket.on("WELCOME", () =>
    socket.emit("WELCOME", {
      msg: "Welcome, you are connecting to server now."
    })
  );

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
    UserManagement.logout(socket.id);
    console.log("Client disconnected");
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
