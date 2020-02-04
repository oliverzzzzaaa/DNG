import React from "react";
import CanvasContainer from "./canvas";
import ScoreBoard from "./scoreboard/scoreboard";
import Timer from "./timer/timer";
import Chat from "../chat/chat";
import MySocket from "../../../socket";
import MidRound from "../game_rooms/mid_round";

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
  }

  guess(word) {
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "guess",
      params: { sender: this.props.currentUser.name, word: word }
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
      console.log(state);
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
    if (this.props.currentUser.id === this.state.currDrawer) {
      return (
        <div className="target-word">
          <h2>{this.state.targetWord}</h2>
        </div>
      );
    }
    return null;
  }

  renderMidRound() {
    if (
      this.state.onRound !== undefined &&
      this.state.onRound === false &&
      (Object.values(this.state.players).some(player => player.guessed) ||
        this.state.onMidRound)
    ) {
      return <MidRound />;
    }

    return null;
  }

  render() {
    return (
      <div className="game-components-div">
        <div id="canvas-and-timer-div">
          <div className="canvas-container">
            {this.renderTargetWord()}
            {/* <div className="canvas-button-container">
              <button onClick={() => this.setState({ isDrawer: true })} className='canvas-button'>
                drawer
              </button>
              <button
                onClick={() => this.setState({ isDrawer: false })} className='canvas-button'>
                viewer
              </button>
            </div> */}

            <CanvasContainer
              isDrawer={
                this.state.onRound &&
                this.props.currentUser.id === this.state.currDrawer
              }
            />
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
