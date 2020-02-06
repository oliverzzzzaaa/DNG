import React from "react";
import "./lobby.css";
import Chat from "../games/chat/chat";
import MySocket from "../../socket";
import GameRooms from "../games/game_rooms/game_rooms";
import NavBar from '../nav_bar/nav_bar_container';
import { Link } from 'react-router-dom';

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.sendPublicMessage = this.sendPublicMessage.bind(this);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const socket = MySocket.getSocket(this.props.currentUser.id);

    socket.off("lobby");
    socket.off("removeRoom");
    socket.off("updateRoom");
    socket.off("lobbyMessage");

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

    socket.on("lobbyMessage", msg => {
      this.setState(preState => {
        const msgs = preState.messages;
        msgs.push(msg);
        return { messages: msgs };
      });
    });

    socket.emit("getRooms");
  }

  sendPublicMessage(msg) {
    MySocket.getSocket().emit("lobbyMessage", {
      sender: this.props.currentUser.name,
      body: msg
    });
  }

  render() {
    return (
      <div className="lobby-page">
        <NavBar />
        <div className="lobby">
          <GameRooms
            className="game-rooms"
            currentUser={this.props.currentUser}
            rooms={this.props.rooms}
            createRoom={this.props.createRoom}
            joinRoom={this.props.joinRoom}
          />
          <div className="nav-chat">
            {/* <Link to={`/users/${this.props.currentUser.id}`}>User</Link> */}
            <Chat
              messages={this.state.messages}
              action={this.sendPublicMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
