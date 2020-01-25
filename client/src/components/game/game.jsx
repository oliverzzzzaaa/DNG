import React from "react";
import CanvasContainer from "../game/canvas";
import ScoreBoard from "../game/scoreboard/scoreboard";
import Timer from "../game/timer/timer";
import Chat from "./chat/chat";
import MySocket from "../../socket";
import MidRound from "../game/game_rooms/mid_round"

export default class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const socket = MySocket.getSocket();
    socket.emit("roundReady")
  }

  render() {
    return (
      <div className="game-components-div">
        <div id="canvas-and-timer-div">
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
            {/* TODO: change to this.props.currentUserId === currentDrawer */}
            <CanvasContainer
              isDrawer={
                this.props.currentUserId === this.props.room.players[0].id
              }
            />
          </div>
        </div>
        <div className="scoreboard-chat">
          <div className="lobby-scoreboard-div">
            <Timer />
            <ScoreBoard />
            <Chat />
          </div>
        </div>
        <MidRound isDrawer={this.props.currentUserId === this.props.room.players[0].id}/>
      </div>
    );
  }
}
