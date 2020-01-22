import React from "react";
import "./lobby.css";
import CanvasContainer from "../game/canvas";
import Chat from "../game/chat/chat";
import ScoreBoard from "../game/scoreboard/scoreboard";
import Timer from "../game/timer/timer";
import ClientComponentExample from "../clientComponentExample";
import Client2 from "../clientExample2";
import GameRooms from "../game/game_rooms/game_rooms_container"
import WaitingRoom from "../game/waiting_lobby/waiting";


class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawer: false
    };
  }
  render() {
    let tempmessages = [
      { sender: "player1", body: "now can work on css" },
      { sender: "player2", body: "message two" },
      { sender: "player1", body: "message three" },
      { sender: "player2", body: "message four" },
      { sender: "player1", body: "message five" },
      { sender: "player2", body: "message six" },
      { sender: "player1", body: "message seven" },
      { sender: "player1", body: "message eight" },
      {
        sender: "player1",
        body: "message that is really really long and might go to the next line"
      },
      { sender: "player1", body: "message ten" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message abc" },
      { sender: "player1", body: "message aaa" },
      { sender: "player1", body: "message banana" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message pineapple" },
      { sender: "player1", body: "message apple bottom jeans" },
      { sender: "player1", body: "message haha" }
    ];
    return (
      <div className="lobby">
        <ClientComponentExample />
        <h1 onClick={this.props.click}>Lobby</h1>
        <div>{this.props.msg}</div>
        <div className="lobby-page">
          <div>All loggedin users</div>
          <GameRooms />
          <Chat messages={tempmessages} />
        </div>
        {/* <button>create</button>
        <button>join</button> */}

        <div className="game-rooms">
          <h1>rooms</h1>
          {/* <WaitingRoom messages={tempmessages} /> */}
        </div>

        {
          //TODO: this is just a draft, to make sure it works.
        }
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
          <div></div>
        </div>
        {
          //TODO: remove above to game component
        }
        <Chat messages={tempmessages} />
      </div>
    );
  }
}

export default Lobby;
