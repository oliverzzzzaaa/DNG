import React from "react";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    // this.startTimer = this.startTimer.bind(this);
    this.state = {
      seconds: 60
    };
    this.intervalId = null;
  }

  componentDidMount() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.tick, 1000);
    }
  }

  componentDidUpdate() {
    if (this.props.stop) {
      clearInterval(this.intervalId);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  tick() {
    if (this.state.seconds !== 0) {
      const timeLeft = 59 - Math.floor((Date.now() - this.props.start) / 1000);
      this.setState({
        seconds: timeLeft < 0 ? 0 : timeLeft
      });
    } else {
      clearInterval(this.intervalId);
      // alert("round over!");
    }
  }

  render() {
    return (
      <div id="timer-circle" onClick={this.startTimer}>
        {this.state.seconds}
      </div>
    );
  }
}

export default Timer;
