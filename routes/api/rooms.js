const router = require("express").Router();
const passport = require("passport");
const User = require("../../models/User");
const Player = require("../../utils/player");
const lobby = require("../../utils/lobby");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //TODO: change image back
    User.findById(req.body.id).then(
      user => {
        if (!user) {
          errors.create = "Please log in!";
          return res.status(404).json(errors);
        }
        const player = new Player(user);
        const room = lobby.createRoom();
        lobby.joinRoom(room.id, player);
        lobby.emit("updateRoom", room.getInfo());
        res.json(room.getInfo());
      },
      err => {
        errors.database = "Unable to connect to server!";
        res.status(500).json(errors);
      }
    );
  }
);

router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const roomId = req.body.roomId;
    User.findById(req.body.id).then(
      user => {
        if (!user) {
          errors.join = "Please log in!";
          return res.status(404).json(errors);
        }
        const player = new Player(user);
        if (lobby.joinRoom(roomId, player)) {
          const room = lobby.getRoom(roomId);
          lobby.emit("updateRoom", room.getInfo());
          res.json(room.getInfo());
        } else {
          res.status(404).json({ msg: "Room does not exist!" });
        }
      },
      err => {
        errors.database = "Unable to connect to server!";
        res.status(500).json(errors);
      }
    );
  }
);

router.post(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const roomInfo = lobby.leaveRoom(req.body.id);
    if (roomInfo) {
      if (roomInfo.isEmpty) {
        lobby.emit("removeRoom", { id: roomInfo.id });
      } else {
        const room = lobby.getRoom(roomInfo.id);
        lobby.emit("updateRoom", room.getInfo());
      }
      res.json({ status: "success" });
    } else {
      res.status(404).json({ msg: "Room does not exist!" });
    }
  }
);

module.exports = router;
