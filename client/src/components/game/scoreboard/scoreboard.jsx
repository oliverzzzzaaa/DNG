import React from 'react'
import './scoreboard.css'

class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
        // below is a sample state
        this.state = {
            1: {
                id: 1,
                username: "Oliver",
                score: 0,
                guessed: false
            },
            2: {
                id: 2,
                username: "GY",
                score: 1,
                guessed: true
            },
            3: {
                id: 3,
                username: "Yin",
                score: 5,
                guessed: true
            }
        }
    }

    sortByScore() {
        let players = Object.values(this.state)
        // ^ temporary, future plan on passing users as a prop
        // let players = Object.values(this.props.users)
        let compare = (a, b) => {
            let comparison = 0;
            if (a.score > b.score) {
                comparison = -1;
            } else {
                comparison = 1;
            }
            return comparison
        }
        return players.sort(compare)
    }

    addScore(userId) {
        let amt = 1
        let originalScore = this.state[userId].score
        this.setState({[userId]: originalScore + amt})
    }

    render() {
        let rankedUsers = null;
        // if (this.props.users) {
            if (this.state) {
            rankedUsers = this.sortByScore().map( user => {
                return(
                    <li className="scoreboard-li" key={user.id}>
                        <div className="scoreboard-user-icon">
                        
                        <span className="scordboard-name">{user.username}</span>
                        </div>
                        <div className="scoreboard-score">{user.score}</div>
                        {/* <span>{(user.guessed === true ? "GOT IT" : null)}</span> */}
                    </li>
                )
            })
        }
        return(
            <div className="scoreboard-div">
                <ul>
                    {rankedUsers}
                </ul>
            </div>
        )
    }
}

export default ScoreBoard;