import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.state = {
            seconds: 60
        }
        this.intervalId = null;
    }

    startTimer() {
        if(!this.intervalId){
            this.intervalId = setInterval(this.tick, 1000)
        }
    }

    componentWillUnmount(){
        if(this.intervalId){
            clearInterval(this.intervalId);
        }
    }
    tick() {
        if (this.state.seconds !== 0) {
            this.setState(preState => ({seconds: preState.seconds - 1}))
        } else {
            clearInterval(this.intervalId);
            alert("round over!");
        }
    }

    render() {
        return(
            <div id="timer-circle" onClick={this.startTimer}>
                {this.state.seconds}
            </div>
        )
    }
}


export default Timer