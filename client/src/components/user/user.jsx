import React from "react";
import "./user.css"

class User extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  showDraw() {
    const drawing = document.getElementById("user-drawings");
    const history = document.getElementById("user-history");
    if(!drawing.classList.contain('show')){
        drawing.classList.toggle("show");
    }
    if (history.classList.contains("show")) {
         history.classList.remove("show");
    }
  }

  showHistory() {
    const drawing = document.getElementById("user-drawings");
    const history = document.getElementById("user-history");
    if (!history.classList.contain("show")) {
      history.classList.toggle("show");
    }
    if (drawing.classList.contains("show")) {
      drawing.classList.remove("show");
    }
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
          <div>{this.props.user.username}</div>
          <div>
            <button>Edit Profile</button>
          </div>
        </div>
        <div className="history-drawing-section">
          <div className="tag-buttons">
            <div onClick={() => this.showHistory()}>history</div>
            <div onClick={() => this.showDraw()}>drawing</div>
          </div>
          <div id="user-history">history content</div>
          <div id="user-drawings">drawings content</div>
        </div>
      </div>
    );
  }
};

export default User;