import React from 'react';

class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.tick = this.tick.bind(this)
        this.state = {
            seconds: 60
        }
    }

    componentDidMount() {
        setTimeout(
            setInterval(this.tick, 1000),
            2000
        )
    }

    componentDidUpdate() {
        if (this.state.seconds === 0) {
            //end game
        }
    }

    tick() {
        if (this.state.seconds !== 0) {
            let newSeconds = this.state.seconds - 1;
            this.setState({seconds: newSeconds})
        }
    }

    render() {
        return(
            <div id="timer-div">
                {this.state.seconds}
            </div>
        )
    }
}


export default Timer