import React from "react";
import Pictionary from "../games/pictionary/pictionary";
import Chat from "../games/chat/chat";
import WaitingContainer from "../games/pictionary/waitingLobby/waitingContainer";
import "./room.css";

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.renderRoomContent = this.renderRoomContent.bind(this);
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
                <Chat messages={[]} />
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  }
  render() {
    return (
      <div className="room-div container-fluid">{this.renderRoomContent()}</div>
    );
  }
}

//Photo by Amy Shamblen on Unsplash
