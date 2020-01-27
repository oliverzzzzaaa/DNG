import React from "react";
import { Button } from "react-bootstrap";
import "./mid_round.css";
import MySocket from "../../../socket";

class MidRound extends React.Component {
  constructor(props) {
    super(props);
    this.savePicture = this.savePicture.bind(this);
    this.state = {
      show: true
    };
    this.ready = this.ready.bind(this);
  }

  handleClose() {
    this.setState({ show: false, roomId: "" });
  }

  handleShow() {
    this.setState({ show: true });
  }

  savePicture() {
    console.log(document.getElementById("pictionary-canvas"));
    document.getElementById("mid-round-img").src = document
      .getElementById("pictionary-canvas")
      .toDataURL();
    console.log("SAVED");
  }

  ready() {
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "roundReady"
    });
  }

  componentDidMount() {
    if (document.getElementById("pictionary-canvas")) {
      document.getElementById("mid-round-img").src = document
        .getElementById("pictionary-canvas")
        .toDataURL();
    }
  }

  render() {
    return (
      <div className="mid-round-modal">
        <span className="rate-this-picture">Rate this picture!</span>
        <div className="mid-round-img-div">
          <img src="" id="mid-round-img" />
        </div>
        <div onClick={this.ready} className="game-rooms-create-text">
          Continue
        </div>
      </div>
    );
  }
}

export default MidRound;
