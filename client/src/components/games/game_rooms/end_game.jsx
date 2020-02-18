import React from 'react'
import ScoreBoard from '../pictionary/scoreboard/scoreboard'
import './end_game.css'

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

export default EndGame;