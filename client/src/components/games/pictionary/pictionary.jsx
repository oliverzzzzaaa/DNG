import React from "react";
import CanvasContainer from "./canvas";
import ScoreBoard from "./scoreboard/scoreboard";
import Timer from "./timer/timer";
import Chat from "../chat/chat";
import MySocket from "../../../socket";
import MidRound from "../game_rooms/mid_round";
import { leaveRoom } from "../../../util/room";

export default class Pictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      canLeave: false
    };
    this.guess = this.guess.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.renderScoreBoard = this.renderScoreBoard.bind(this);
    this.renderMidRound = this.renderMidRound.bind(this);
    this.renderTargetWord = this.renderTargetWord.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.renderLeaveBtn = this.renderLeaveBtn.bind(this);
    this.leave = this.leave.bind(this);
    this.returnToWaitingRoom = this.returnToWaitingRoom.bind(this);
  }

  guess(word) {
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "guess",
      params: { sender: this.props.currentUserName, word: word }
    });
  }

  componentDidMount() {
    const socket = MySocket.getSocket();
    socket.off("updateGameState");
    socket.off("message");

    socket.on("message", message =>
      this.setState(preState => {
        const msgs = preState.messages;
        msgs.push(message);
        return { messages: msgs };
      })
    );

    socket.on("updateGameState", state => {
      this.setState(state);

      const players = Object.values(state.players);
      let connectedPlayer = 2;
      if (players) {
        connectedPlayer = 0;
        for (let i = 0; i < players.length; i++) {
          if (players[i].connected.status) {
            connectedPlayer++;
          }
        }
      }

      if (connectedPlayer < 2) {
        this.setState({ canLeave: true });
      } else {
        this.setState({ canLeave: false });
      }
    });

    socket.emit("gameAction", {
      game: "Pictionary",
      type: "roundReady"
    });

    socket.emit("gameAction", {
      game: "Pictionary",
      type: "getState"
    });
  }

  renderTimer() {
    if (this.state.onRound) {
      return (
        <Timer start={this.state.roundStartTime} stop={!this.state.onRound} />
      );
    }
    return null;
  }

  renderScoreBoard() {
    if (this.state.players) {
      return <ScoreBoard players={this.state.players} />;
    }
  }

  renderTargetWord() {
    if (this.props.currentUserId === this.state.currDrawer) {
      return (
        <div className="target-word">
          <h2>{this.state.targetWord}</h2>
        </div>
      );
    }
    return null;
  }

  leave() {
    leaveRoom(this.props.currentUserId).then(
      () => (window.location.hash = "/lobby")
    );
  }

  returnToWaitingRoom() {
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "endGame"
    });
  }

  renderLeaveBtn() {
    const players = this.state.players;
    if (
      players &&
      Object.values(players).some(
        player => player.id === this.props.currentUserId
      )
    ) {
      if (this.state.canLeave) {
        return (
          <div className="observer-leave" onClick={this.returnToWaitingRoom}>
            <span className="observer-leave-button">
              Return to Waiting Room
            </span>
          </div>
        );
      }
      return null;
    }
    return (
      <div className="observer-leave" onClick={this.leave}>
        <span className="observer-leave-button">LEAVE</span>
      </div>
    );
  }

  renderMidRound() {
    if (
      this.state.onRound !== undefined &&
      this.state.onRound === false &&
      (Object.values(this.state.players).some(player => player.guessed) ||
        this.state.onMidRound)
    ) {
      let isPlayer = false;
      if (
        Object.values(this.state.players).some(
          player => player.id === this.props.currentUserId
        )
      ) {
        isPlayer = true;
      }
      return (
        <MidRound targetWord={this.state.targetWord} isPlayer={isPlayer} />
      );
    }

    return null;
  }

  renderCanvas() {
    if (this.state.strokes) {
      return (
        <CanvasContainer
          isDrawer={
            this.state.onRound &&
            this.props.currentUserId === this.state.currDrawer
          }
          strokes={this.state.strokes}
          players={Object.values(this.state.players)}
          currDrawer={this.state.currDrawer}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="game-components-div">
        <div id="canvas-and-timer-div">
          <div className="return-lobby">{this.renderLeaveBtn()}</div>
          {this.renderScoreBoard()}
          <div className="canvas-and-word">
            {this.renderTargetWord()}
            <div className="canvas-container">{this.renderCanvas()}</div>
          </div>
        </div>
        <div className="scoreboard-chat">
          <div className="lobby-scoreboard-div">
            {this.renderTimer()}
            {/* {this.renderScoreBoard()} */}
            <Chat action={this.guess} messages={this.state.messages} />
          </div>
        </div>
        {this.renderMidRound()}
      </div>
    );
  }
}
