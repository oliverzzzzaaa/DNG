import React from "react";
import "./lobby.css";
import CanvasContainer from "../game/canvas";
import Chat from '../game/chat/chat'
import ScoreBoard from '../game/scoreboard/scoreboard'
import Timer from '../game/timer/timer'

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false
    };
  }
  render() {
    let tempmessages = [{ sender: "player1", body: "now can work on css" },
    { sender: "player2", body: "message two"},
    { sender: "player1", body: "message three"},
    { sender: "player2", body: "message four"},
    { sender: "player1", body: "message five"},
    { sender: "player2", body: "message six"},
    { sender: "player1", body: "message seven"},
    { sender: "player1", body: "message eight"},
    { sender: "player1", body: "message that is really really long and might go to the next line"},
    { sender: "player1", body: "message ten"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
    { sender: "player1", body: "message 11"},
  ]
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
        <div className="lobby-scoreboard-div">
          <ScoreBoard />
        </div>
        <div className="canvas-container">
          <Timer />
          <CanvasContainer isDrawer={this.state.isDrawer} />
        </div>
        <div>
          <Chat messages={tempmessages}/>
        </div>
      </div>
    );
  }
}

export default Lobby;
