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
    if (this.props.room) {
      return (
        <div className="game-or-waiting-div">
          {this.props.room.onGame ? (
            <Pictionary
              currentUserId={this.props.currentUser.id}
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
                <Chat messages={tempmessages} />
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
