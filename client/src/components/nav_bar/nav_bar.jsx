import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css'
import QuestionModal from './question_modal'

class NarBar extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.showQuestion = this.showQuestion.bind(this)
        this.hideQuestion = this.hideQuestion.bind(this)
        this.state = {
          questionModal: false
        }
    }

    handleLogout(){
        this.props.logout();
    }

    showQuestion() {
      this.setState({questionModal: true})
      console.log("SHOW")
    }

    hideQuestion() {
      this.setState({questionModal: false})
    }

    renderModal() {
      if (this.state.questionModal) {
        return (
          <QuestionModal hideQuestion={this.hideQuestion}/>
        )
      } else {
        return null;
      }
    }


    render(){
        if (typeof currentUser === undefined) return null;
        return (
          <div className="nav-bar-main">
            {this.renderModal()}
            <div className="nav-bar-container">
              <Link to="/" className="navbar-logo">
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
              </Link>
              
              <button className="question-modal-button" onClick={this.showQuestion}>
                ?
              </button>
              <div className="nav-bar-button">
                <button className="nav-bar-logout">
                  <Link
                    to={`/users/${this.props.currentUserId}`}
                    className="disabled-link"
                  >
                    Profile!
                  </Link>
                </button>
                <button className="nav-bar-logout" onClick={this.handleLogout}>
                  Bye!
                </button>
              </div>
            </div>
          </div>
        );
    }

}

export default NarBar;