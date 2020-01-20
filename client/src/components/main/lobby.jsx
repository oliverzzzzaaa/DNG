import React from "react";
import "./lobby.css";

class Lobby extends React.Component {
  render() {
    return (
      <div className="lobby">
        <h1 onClick={this.props.click}>Lobby</h1>
        <div>{this.props.msg}</div>
      </div>
    );
  }
}

export default Lobby;
