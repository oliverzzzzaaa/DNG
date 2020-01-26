import React from "react";
import "./lobby.css";
import Chat from "../games/chat/chat";
import MySocket from "../../socket";
import GameRooms from "../games/game_rooms/game_rooms"
// import MidRound from '../game/game_rooms/mid_round'

class Lobby extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = MySocket.getSocket(this.props.currentUser.id);

    socket.off("lobby");
    socket.off("removeRoom");
    socket.off("updateRoom");

    socket.on("lobby", payload => {
      this.props.receiveRooms(payload.rooms);
      if (payload.roomId) {
        const user = this.props.currentUser;
        user.roomId = payload.roomId;
        this.props.joinRoom(user);
      }
    });

    socket.on("removeRoom", payload => {
      this.props.removeRoom(payload.id);
    });

    socket.on("updateRoom", data => {
      this.props.receiveRoom(data);
    });

    socket.emit("getRooms");
  }

  render() {
    let tempmessages = [
      { sender: "player1", body: "now can work on css" },
      { sender: "player2", body: "message two" },
      { sender: "player1", body: "message three" },
      { sender: "player2", body: "message four" },
      { sender: "player1", body: "message five" },
      { sender: "player2", body: "message six" },
      { sender: "player1", body: "message seven" },
      { sender: "player1", body: "message eight" },
      {
        sender: "player1",
        body: "message that is really really long and might go to the next line"
      },
      { sender: "player1", body: "message ten" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message abc" },
      { sender: "player1", body: "message aaa" },
      { sender: "player1", body: "message banana" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message pineapple" },
      { sender: "player1", body: "message apple bottom jeans" },
      { sender: "player1", body: "message haha" }
    ];
    return (
      <div className="lobby">
        {/* <ClientComponentExample /> */}
        {/* <h1>Lobby</h1> */}
        {/* <div>{this.props.msg}</div> */}
        {/* <div className="lobby-page"> */}
        {/* <div className="test">All loggedin users</div> */}
        <GameRooms
          className="game-rooms"
          currentUser={this.props.currentUser}
          rooms={this.props.rooms}
          createRoom={this.props.createRoom}
          joinRoom={this.props.joinRoom}
        />
        <Chat messages={tempmessages} />
        {/* </div> */}
        {/* <div className="game-rooms">
          <h1>rooms</h1>
        </div>
        <Chat messages={tempmessages} /> */}
        
      </div>
    );
  }
}

export default Lobby;
