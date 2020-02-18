import React from 'react'
import ScoreBoard from '../pictionary/scoreboard/scoreboard'

class EndGame extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="end-game-div">
                <h1>ABC is the winner!</h1>
                <ScoreBoard />
            </div>
        )
    }
}