import React from "react";
import "./lobby.css";
import CanvasContainer from "../game/canvas";
import Chat from '../game/chat/chat'
import ScoreBoard from '../game/scoreboard/scoreboard'

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false
    };
  }
  render() {
    return (
      <div className="lobby">
        <h1 onClick={this.props.click}>Lobby</h1>
        <div>{this.props.msg}</div>

        {
          //TODO: this is just a draft, to make sure it works.
        }
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
        <div>
          <ScoreBoard />
        </div>
        <div className="canvas-container">
          <CanvasContainer isDrawer={this.state.isDrawer} />
        </div>
        <div>
          <Chat />
        </div>
      </div>
    );
  }
}

export default Lobby;
