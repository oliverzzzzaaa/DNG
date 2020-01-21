const app = require("express")();
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const bodyParser = require("body-parser");
const passport = require("passport");
const port = process.env.PORT || 5000;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", users);

io.on("connection", socket => {
  console.log("New client connected");
  socket.emit("WELCOME", { data: "Welcome, I reveived your msg." });
  socket.on("SOMEACTIONTYPE", socket =>
    socket.emit("SOMERESPONCETYPE", { msg: "A component that useing socket" })
  );
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

http.listen(port, () => console.log(`Listening on port ${port}`));
