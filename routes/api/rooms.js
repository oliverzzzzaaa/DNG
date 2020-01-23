const router = require("express").Router();
const passport = require("passport");
const Rooms = require("../../utils/rooms");
const UserManagement = require("../../utils/userManagement");
const User = require("../../models/User");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rooms = Rooms.getInstance();
    const roomId = rooms.create();
    //TODO: change image back
    User.findById(req.body.id).then(
      user => {
        if (!user) {
          errors.create = "Please log in!";
          return res.status(404).json(errors);
        }
        const player = {
          id: user._id,
          // image: req.body.image,
          image: user.image,
          name: user.username,
          ready: false
        };

        rooms.join(roomId, player);
        const room = rooms.get(roomId);
        console.log(room);
        UserManagement.getConnectedSocket().forEach(socket => {
          socket.emit("updateRoom", room);
        });
        res.json(room);
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
    const rooms = Rooms.getInstance();
    User.findById(req.body.id).then(
      user => {
        if (!user) {
          errors.join = "Please log in!";
          return res.status(404).json(errors);
        }
        const player = {
          id: user._id,
          // image: req.body.image,
          image: user.image,
          name: user.username,
          ready: false
        };
        if (rooms.join(roomId, player)) {
          UserManagement.getConnectedSocket().forEach(socket => {
            socket.emit("updateRoom", rooms.get(roomId));
          });
          res.json(rooms.get(roomId));
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
    const userId = req.body.id;
    const rooms = Rooms.getInstance();
    const roomId = rooms.leave(userId);
    if (roomId) {
      UserManagement.getConnectedSocket().forEach(socket => {
        socket.emit("leaveRoom", {
          id: roomId,
          players: rooms.get(roomId)
        });
      });
      res.json({ status: "success" });
    } else {
      res.status(404).json({ msg: "Room does not exist!" });
    }
  }
);

module.exports = router;
