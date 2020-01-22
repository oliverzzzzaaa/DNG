const router = require("express").Router();
const passport = require("passport");
const Rooms = require("../../utils/rooms");
const UserManagement = require("../../utils/userManagement");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const rooms = Rooms.getInstance();
    const roomId = rooms.create();
    rooms.join(roomId, {
      id: req.body.id,
      image: req.body.image,
      name: req.body.name
    });
    UserManagement.getConnectedSocket().forEach(socket => {
      socket.emit("roomActivities", { id: roomId, players: rooms.get(roomId) });
    });
    res.json({ status: "success" });
  }
);

router.post(
  "/join",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const roomId = req.body.roomId;
    const rooms = Rooms.getInstance();
    if (
      rooms.join(roomId, {
        id: req.body.id,
        image: req.body.image,
        name: req.body.name
      })
    ) {
      UserManagement.getConnectedSocket().forEach(socket => {
        socket.emit("roomActivities", {
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

router.post(
  "/leave",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.body.id;
    const rooms = Rooms.getInstance();
    const roomId = rooms.leave(userId);
    if (roomId) {
      UserManagement.getConnectedSocket().forEach(socket => {
        socket.emit("roomActivities", {
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

// {
//     hostId: 1,
// }
module.exports = router;
