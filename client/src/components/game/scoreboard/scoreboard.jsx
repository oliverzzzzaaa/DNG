import React from 'react'
import './scoreboard.css'

//temporary Addscore on click, to confirm functionality


class ScoreBoard extends React.Component {
    constructor(props) {
        super(props)
        this.addScore = this.addScore.bind(this)
        this.sortByScore = this.sortByScore.bind(this)
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
            },
            4: {
                id: 4,
                username: "Johnson",
                score: 5,
                guessed: false
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

    addScore(id, amt = 1) {
        let newUserInfo = this.state[id]
        newUserInfo.score = newUserInfo.score + amt
        this.setState({[id]: newUserInfo})
    }

    render() {
        let rankedUsers = null;
        // if (this.props.users) {
            if (this.state) {
            rankedUsers = this.sortByScore().map( user => {
                return(
                    <li className="scoreboard-li" key={user.id}>
                        <div className="scoreboard-user-icon">
                        <span className="scordboard-name" onClick={() => this.addScore(user.id)}>{user.username}</span>
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