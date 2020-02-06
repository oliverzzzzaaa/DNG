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
      messages: []
    };
    this.guess = this.guess.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.renderScoreBoard = this.renderScoreBoard.bind(this);
    this.renderMidRound = this.renderMidRound.bind(this);
    this.renderTargetWord = this.renderTargetWord.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
    this.renderLeaveBtn = this.renderLeaveBtn.bind(this);
    this.leave = this.leave.bind(this);
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

  renderLeaveBtn() {
    if (
      this.state.players &&
      Object.values(this.state.players).some(
        player => player.id === this.props.currentUserId
      )
    ) {
      return null;
    }
    //TODO: add css to leave btn
    return <button onClick={this.leave}>LEAVE (need to add styling)</button>;
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
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div className="game-components-div">
        <div id="canvas-and-timer-div">
          {//TODO: move leave button to a better position
          this.renderLeaveBtn()}
          <div className="canvas-and-word">
            {this.renderTargetWord()}
            <div className="canvas-container">
              {/* <div className="canvas-button-container">
                <button onClick={() => this.setState({ isDrawer: true })} className='canvas-button'>
                  drawer
                </button>
                <button
                  onClick={() => this.setState({ isDrawer: false })} className='canvas-button'>
                  viewer
                </button>
              </div> */}

              {this.renderCanvas()}
            </div>
          </div>
        </div>
        <div className="scoreboard-chat">
          <div className="lobby-scoreboard-div">
            {this.renderTimer()}
            {this.renderScoreBoard()}
            <Chat action={this.guess} messages={this.state.messages} />
          </div>
        </div>
        {this.renderMidRound()}
      </div>
    );
  }
}
