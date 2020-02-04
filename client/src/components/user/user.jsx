import React from "react";
import "./user.css"

class User extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  componentDidUpdate() {
    document.getElementById("defaultOpen").click();
  }

  open(event, type) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(type).style.display = "flex";
    event.currentTarget.className += " active";
  }

  render() {
    if (!this.props.user) return null;
    
    return (
      <div className="user-profile-page">
        <div className="user-profile-container">
          <div className="user-profile-icon">
            <img
              className="user-profile-image"
              src="https://www.pinclipart.com/picdir/middle/355-3553881_stockvader-predicted-adig-user-profile-icon-png-clipart.png"
              alt=""
            />
          </div>
          <div className="user-profile-username">
            {this.props.user.username}
          </div>
          <div className="user-profile-edit">
            <span className="user-profile-edit-button">Edit Profile</span>
          </div>
        </div>

        <div className="tab">
          <div className="tablinks-container">
            <a>
              <span
                className="tablinks"
                onClick={e => this.open(e, "games")}
                id="defaultOpen"
              >
                Games
              </span>
            </a>
            <a>
              <span
                className="tablinks"
                onClick={e => this.open(e, "drawings")}
              >
                Drawings
              </span>
            </a>
          </div>

          <div className="tabcontent-container">
            <div id="games" className="tabcontent">
              <span>Game1 1st YIN JOHNSON OLIVER</span>
              <span>Game2 3rd JOHNSON YIN OLIVER</span>
              <span>Game3 4th OLIVER JOHNSON YIN</span>
              <span>Game4 4th OLIVER JOHNSON YIN</span>
              <span>Game5 4th OLIVER JOHNSON YIN</span>
              <span>Game6 4th OLIVER JOHNSON YIN</span>
              <span>Game7 4th OLIVER JOHNSON YIN</span>
              <span>Game8 4th OLIVER JOHNSON YIN</span>
              <span>Game9 4th OLIVER JOHNSON YIN</span>
              <span>Game10 4th OLIVER JOHNSON YIN</span>
              <span>Game11 4th OLIVER JOHNSON YIN</span>
              <span>Game12 4th OLIVER JOHNSON YIN</span>
              <span>Game13 4th OLIVER JOHNSON YIN</span>
              <span>Game14 4th OLIVER JOHNSON YIN</span>
              <span>Game15 4th OLIVER JOHNSON YIN</span>
            </div>

            <div id="drawings" className="tabcontent">
              <div className="history-pics">
                <span>Drawing1</span>
              </div>
              <div className="history-pics">
                <span>Drawing2</span>
              </div>
              <div className="history-pics">
                <span>Drawing3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default User;