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
    this.state = {
      difficulty: this.props.room.config.difficulty
        ? this.props.room.config.difficulty
        : "easy"
    };
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
      game: "Pictionary",
      difficulty: this.state.difficulty
    });
  }

  changeDifficulty(diff) {
    if (
      document.getElementsByClassName("waiting-buttons-selected").length > 0
    ) {
      document.getElementsByClassName("waiting-buttons-selected")[0].className =
        "waiting-buttons";
    }
    this.setState({ difficulty: diff });
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "setDifficulty",
      params: { difficulty: diff }
    });
  }

  componentDidMount() {
    const socket = MySocket.getSocket();
    socket.off("setDifficulty");
    socket.on("setDifficulty", difficulty => {
      this.setState({
        difficulty: difficulty
      });
    });

    let diff = this.state.difficulty;
    if (diff === "easy") {
      document
        .getElementById("easy-button")
        .classList.add("waiting-buttons-selected");
    } else if (diff === "medium") {
      document
        .getElementById("medium-button")
        .classList.add("waiting-buttons-selected");
    } else {
      document
        .getElementById("hard-button")
        .classList.add("waiting-buttons-selected");
    }
  }

  renderPlayers() {
    if (this.props.room) {
      return (
        <div className="room-ready-state">
          {/* TODO: delete this */}
          <div className="delete-this-div">
            {/* <p id="room-ready-state2">{`Players are ${
              this.props.room.ready ? "" : "not"
            } ready!  Game is ${
              this.props.room.onGame ? "" : "not"
            } on going!`}</p> */}
            <p>Minimum number of player: 2</p>
          </div>
          <ProfileIcon users={this.props.room.players} />
        </div>
      );
    }
    return null;
  }

  renderDifficulties() {
    if (this.props.room.players[0].id === this.props.currentUserId) {
      return (
        <div className="difficulty-div">
          <div
            className="waiting-buttons"
            onClick={() => this.changeDifficulty("easy")}
            id="easy-button"
          >
            Easy
          </div>
          <div
            className="waiting-buttons"
            onClick={() => this.changeDifficulty("medium")}
            id="medium-button"
          >
            Medium
          </div>
          <div
            className="waiting-buttons"
            onClick={() => this.changeDifficulty("hard")}
            id="hard-button"
          >
            Hard
          </div>
        </div>
      );
    } else {
      return (
        <div className="difficulty-div">
          <div className="waiting-buttons not-host" id="easy-button">
            Easy
          </div>
          <div className="waiting-buttons not-host" id="medium-button">
            Medium
          </div>
          <div className="waiting-buttons not-host" id="hard-button">
            Hard
          </div>
        </div>
      );
    }
  }

  renderReadyBtn() {
    if (
      this.props.room &&
      this.props.room.ready &&
      this.props.room.players[0].id === this.props.currentUserId
    ) {
      return (
        <div className="waiting-buttons" onClick={this.start}>
          Start
        </div>
      );
    }
    return (
      <div className="waiting-buttons" onClick={this.ready}>
        Ready
      </div>
    );
  }

  componentDidUpdate() {
    if (this.state.difficulty === "easy") {
      document.getElementById("easy-button").className =
        "waiting-buttons-selected";
      document.getElementById("medium-button").className = "waiting-buttons";
      document.getElementById("hard-button").className = "waiting-buttons";
    } else if (this.state.difficulty === "medium") {
      document.getElementById("easy-button").className = "waiting-buttons";
      document.getElementById("medium-button").className =
        "waiting-buttons-selected";
      document.getElementById("hard-button").className = "waiting-buttons";
    } else {
      document.getElementById("easy-button").className = "waiting-buttons";
      document.getElementById("medium-button").className = "waiting-buttons";
      document.getElementById("hard-button").className =
        "waiting-buttons-selected";
    }

    if (this.props.room.players[0].id !== this.props.currentUserId) {
      document.getElementById("easy-button").classList.add("not-host");
      document.getElementById("medium-button").classList.add("not-host");
      document.getElementById("hard-button").classList.add("not-host");
    }
  }

  render() {
    return (
      <div className="waiting-room">
        <div className="waiting-room-profiles">
          <div className="waiting-header">
            <span className="room-id-header">
              Room ID: {this.props.room.id}
            </span>
            {this.renderDifficulties()}
          </div>
          {this.renderPlayers()}
          <div className="ready-button-div">
            <div className="waiting-buttons" onClick={this.leave}>
              Leave
            </div>
            {this.renderReadyBtn()}
          </div>
        </div>
      </div>
    );
  }
}

export default Waiting;
