import React from "react";
import "./mid_round.css";
import MySocket from "../../../socket";

class MidRound extends React.Component {
  constructor(props) {
    super(props);
    this.savePicture = this.savePicture.bind(this);
    this.timeoutId = null;
    this.time = 5;
    this.nextRound = this.nextRound.bind(this);
    this.tick = this.tick.bind(this);
    this.state = {
      show: true,
      time: this.time,
      ready: false
    };
    this.ready = this.ready.bind(this);
  }

  handleClose() {
    this.setState({ show: false, roomId: "" });
  }

  handleShow() {
    this.setState({ show: true });
  }

  // continueInterval() {
  //   document.getElementsByClassName("game-rooms-create-text")[0].click();
  // }

  savePicture() {
    document.getElementById("mid-round-img").src = document
      .getElementById("pictionary-canvas")
      .toDataURL();
  }

  ready() {
    this.setState({ ready: true });
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "roundReady"
    });
  }

  componentDidMount() {
    this.timeoutId = setTimeout(this.ready, 6000);
    if (document.getElementById("pictionary-canvas")) {
      document.getElementById("mid-round-img").src = document
        .getElementById("pictionary-canvas")
        .toDataURL();
    }
    this.intervalId = setInterval(this.tick, 1000);
  }

  tick() {
    let newTime = (this.state.time -= 1);
    if (newTime < 0) {
      newTime = 0;
    }
    this.setState({ time: newTime });
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
    clearInterval(this.intervalId);
  }

  nextRound() {
    if (this.state.ready) {
      return (
        <div onClick={this.ready} className="game-rooms-create-text">
          {`Waiting for other players....${this.state.time}`}
        </div>
      );
    } else {
      return (
        <div onClick={this.ready} className="game-rooms-create-text">
          {`Continue....${this.state.time}`}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="mid-round-modal">
        <span className="rate-this-picture">{this.props.targetWord}!</span>
        <div className="mid-round-img-div">
          <img src="" id="mid-round-img" />
        </div>
        {this.nextRound()}
      </div>
    );
  }
}

export default MidRound;
