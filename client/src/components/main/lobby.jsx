import React from "react";
import "./lobby.css";
import CanvasContainer from "../game/canvas";

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
        <div style={{ border: "1px solid red", position: "relative" }}>
          <CanvasContainer isDrawer={this.state.isDrawer} />
        </div>
      </div>
    );
  }
}

export default Lobby;
