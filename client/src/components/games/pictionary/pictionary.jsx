import React from "react";
<<<<<<< HEAD:client/src/components/game/game.jsx
import CanvasContainer from "../game/canvas";
import ScoreBoard from "../game/scoreboard/scoreboard";
import Timer from "../game/timer/timer";
import Chat from "./chat/chat";
import MySocket from "../../socket";
import MidRound from "../game/game_rooms/mid_round"
=======
import CanvasContainer from "./canvas";
import ScoreBoard from "./scoreboard/scoreboard";
import Timer from "./timer/timer";
import Chat from "../chat/chat";
import MySocket from "../../../socket";
>>>>>>> 4d838a3f0a66f7f8554e948394f9bd5b7be9bf1e:client/src/components/games/pictionary/pictionary.jsx

export default class Pictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    MySocket.getSocket().on("gameAction", payload => {
      console.log("gameAction");
      switch (payload.type) {
        case "updateGameState":
          this.setState(payload.state);
          break;
        default:
          break;
      }
    });

    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "roundReady"
    });
  }

  componentDidUpdate() {
    console.log("(((((((((((((1)))))))))))))");
    console.log(this.state);
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
