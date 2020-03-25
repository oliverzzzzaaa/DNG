import React from "react";
import "./question_modal.css";

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="question-modal">
          <div className="question-header">
            <h1>DrawIt!</h1>
            <span onClick={this.props.hideQuestion} className="close-button">
              <div className="leftright"></div>
              <div className="rightleft"></div>
              <label className="close">close</label>
            </span>
          </div>
          <div className="question-body">
            <h2>
              DrawIt is our online Pictionary game. To play, you need at least
              one friend
            </h2>
            <br />
            <h2>To create a room, just click Create!</h2>
            <br />
            <h2>
              To join a room, click on the room in the lobby, OR click "JOIN"
              and enter the room ID
            </h2>
            <br />
            <h2>Once all players are ready, the host can start the game!</h2>
            <br/>
            <img clasName="question-img" src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/drawing.gif" alt="GamePlay"/>
            <br/>
            <h2>
              You can also change your profile picture or name in the PROFILE section
            </h2>
          </div>
          <div className="question-footer">
            <h1>Have fun!</h1>
          </div>
      </div>
    );
  }
}

export default QuestionModal;
