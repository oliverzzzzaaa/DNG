import React from "react";
import "./scoreboard.css";

//temporary Addscore on click, to confirm functionality

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.addScore = this.addScore.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
  }

  sortByScore() {
    let players = Object.values(this.props.players);
    let compare = (a, b) => {
      let comparison = 0;
      if (a.score > b.score) {
        comparison = -1;
      } else {
        comparison = 1;
      }
      return comparison;
    };
    return players.sort(compare);
  }

  addScore(id, amt = 1) {
    let newUserInfo = this.props.players[id];
    newUserInfo.score = newUserInfo.score + amt;
    this.setState({ [id]: newUserInfo });
  }

  render() {
    let rankedUsers = null;
    if (this.props.players) {
      rankedUsers = this.sortByScore().map(user => {
        return (
          <li className="scoreboard-li" key={user.id}>
            <div className="scoreboard-user-icon">
              <span
                className="scordboard-name"
                onClick={() => this.addScore(user.id)}
              >
                {user.name}
              </span>
            </div>
            <div className="scoreboard-score">{user.score}</div>
            {/* <span>{(user.guessed === true ? "GOT IT" : null)}</span> */}
          </li>
        );
      });
    }
    return (
      <div className="scoreboard-div">
        <ul className="scoreboard-ul">{rankedUsers}</ul>
      </div>
    );
  }
}

export default ScoreBoard;
