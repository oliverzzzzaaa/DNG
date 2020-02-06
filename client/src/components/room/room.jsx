import React from "react";
import Pictionary from "../games/pictionary/pictionary";
import Chat from "../games/chat/chat";
import WaitingContainer from "../games/pictionary/waitingLobby/waitingContainer";
import MySocket from "../../socket";
import "./room.css";

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.renderRoomContent = this.renderRoomContent.bind(this);
    this.state = {
      messages: []
    };
    this.sendRoomMessage = this.sendRoomMessage.bind(this);
  }

  componentDidMount() {
    MySocket.getSocket().off("roomMessage");
    MySocket.getSocket().on("roomMessage", msg => {
      this.setState(preState => {
        const msgs = preState.messages;
        msgs.push(msg);
        return { messages: msgs };
      });
    });
  }

  sendRoomMessage(msg) {
    MySocket.getSocket().emit("roomMessage", {
      sender: this.props.currentUser.name,
      body: msg
    });
  }

  renderRoomContent() {
    if (this.props.room) {
      return (
        <div className="game-or-waiting-div">
          {this.props.room.onGame ? (
            <Pictionary
              currentUser={this.props.currentUser}
              room={this.props.room}
            />
          ) : (
            <div className="waiting-div">
              <WaitingContainer
                messages={this.props.messages}
                room={this.props.room}
                users={this.props.room.players}
              />
              <div className="room-chat-div">
                <Chat
                  action={this.sendRoomMessage}
                  messages={this.state.messages}
                />
              </div>
            </div>
          )}
        </div>
      );
    }
    window.location.hash = "/lobby"
  }
  render() {
    return (
      <div className="room-div container-fluid">{this.renderRoomContent()}</div>
    );
  }
}
