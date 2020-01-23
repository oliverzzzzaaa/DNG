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
    //TODO: change image back
    const player = {
      id: req.body.id,
      // image: req.body.image,
      image:
        "https://i7.pngguru.com/preview/178/419/741/computer-icons-avatar-login-user-avatar.jpg",
      name: req.body.name,
      ready: false
    };
    rooms.join(roomId, player);
    UserManagement.getConnectedSocket().forEach(socket => {
      socket.emit("updateRoom", { id: roomId, players: rooms.get(roomId) });
    });
    res.json({ id: roomId, players: rooms.get(roomId) });
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
        //TODO: change image back
        // image: req.body.image,
        image: "https://image.flaticon.com/icons/png/512/194/194938.png",
        name: req.body.name,
        ready: false
      })
    ) {
      UserManagement.getConnectedSocket().forEach(socket => {
        socket.emit("updateRoom", {
          id: roomId,
          players: rooms.get(roomId)
        });
      });
      res.json({
        id: roomId,
        players: rooms.get(roomId)
      });
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
