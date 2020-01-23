import React from "react";
import CanvasContainer from "../game/canvas";
import ScoreBoard from "../game/scoreboard/scoreboard";
import Timer from "../game/timer/timer";
import Chat from "./chat/chat";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false
    };
  }
  render() {
    return (
      <div className="game-components-div">
        <div className="lobby-scoreboard-div">
          <ScoreBoard />
        </div>
        <div id="canvas-and-timer-div">
          <div id="timer-div">
            <Timer />
          </div>
          <div className="canvas-container">
            <button
              onClick={() =>
                this.setState({
                  isDrawer: true
                })
              }
            >
              drawer
            </button>
            <button
              onClick={() =>
                this.setState({
                  isDrawer: false
                })
              }
            >
              viewer
            </button>
            <CanvasContainer isDrawer={this.state.isDrawer} />
          </div>
        </div>
        <div >
          <Chat />
        </div>
      </div>
    );
  }
}
