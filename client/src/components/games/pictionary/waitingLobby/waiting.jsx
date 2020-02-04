import React from "react";
import "./waiting.css";
import ProfileIcon from "../../../profile/profile_icon";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { leaveRoom } from "../../../../util/room";
import MySocket from "../../../../socket";

class Waiting extends React.Component {
  constructor(props) {
    super(props);
    this.leave = this.leave.bind(this);
    this.ready = this.ready.bind(this);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.renderReadyBtn = this.renderReadyBtn.bind(this);
    this.start = this.start.bind(this);
  }

  leave() {
    leaveRoom(this.props.currentUserId).then(
      () => (window.location.hash = "/lobby")
    );
  }

  ready() {
    MySocket.getSocket().emit("ready");
  }

  start() {
    MySocket.getSocket().emit("startGame", {
      game: "Pictionary"
    });
  }

  renderPlayers() {
    if (this.props.room) {
      return (
        <div className="room-ready-state">
          {/* TODO: delete this */}
          <div className="delete-this-div">
            <p id="room-ready-state2">{`Players are ${
              this.props.room.ready ? "" : "not"
            } ready!  Game is ${
              this.props.room.onGame ? "" : "not"
            } on going!`}</p>
          </div>
          <ProfileIcon users={this.props.room.players} />
        </div>
      );
    }
    return null;
  }

  renderReadyBtn() {
    if (
      this.props.room &&
      this.props.room.ready &&
      this.props.room.players[0].id === this.props.currentUserId
    ) {
      return (
        <Button variant="warning outline-light" onClick={this.start}>
          Start
        </Button>
      );
    }
    return (
      <Button variant="warning outline-light" onClick={this.ready}>
        Ready
      </Button>
    );
  }

  render() {
    return (
      <div className="waiting-room">
        <div className="waiting-room-profiles">
          {this.renderPlayers()}
          {/* <button className="waiting-room-ready2">Ready</button> */}
          {/* <button className="btn btn-info">Ready</button> */}
          <div className="ready-button-div">
            <Button
              variant="warning outline-light"
              className="waiting-leave"
              onClick={this.leave}
            >
              Leave
            </Button>
            {this.renderReadyBtn()}
          </div>
        </div>
        {/* <div className="waiting-room-ready-button">
                    <button>Ready</button>
                </div> */}
      </div>
    );
  }
}

export default Waiting;
