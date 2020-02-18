import React from "react";
import "./user.css";
import ProfileIconEditor from "./profileIconEditor";
import { Link } from "react-router-dom";

const COMINGSOON = "Coming soon";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false
    };
    this.renderEditor = this.renderEditor.bind(this);
    this.showEditor = this.showEditor.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.userId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.username !== this.props.username ||
      nextProps.image !== this.props.image ||
      nextState.showEditor !== this.state.showEditor
    );
  }

  componentDidUpdate() {
    document.getElementById("defaultOpen").click();
    //TODO: change this
    // this.props.fetchUser(this.props.match.params.userId);
  }

  open(event, type) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
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

  showEditor() {
    this.setState({
      showEditor: true
    });
  }

  closeEditor() {
    this.setState({
      showEditor: false
    });
  }

  renderEditor() {
    if (this.state.showEditor) {
      return (
        <ProfileIconEditor
          name={this.props.username}
          image={this.props.image}
          close={this.closeEditor}
          update={this.updateInfo}
        />
      );
    }
  }

  updateInfo(data) {
    const newState = {
      username: data.username
    };
    if (data.image) {
      newState.image = data.image;
    }
    this.props.updateProfile(this.props.userId, data);
    this.props.newName(data.name);
  }

  render() {
    if (!this.props.userId) return null;
    return (
      <div className="user-profile-page">
        {this.renderEditor()}
        <div className="user-profile-container">
          <div>
            <Link to="/" className="arrow-left"></Link>
          </div>
          <div className="user-profile-icon">
            <img
              className="user-profile-image"
              src={
                //TODO: change default image src
                this.props.image
              }
            />
          </div>
          <div className="user-profile-username">{this.props.username}</div>
          <div className="user-profile-edit" onClick={this.showEditor}>
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
              <div className="game-history">
                <span>{COMINGSOON}</span>
              </div>
              <div className="game-history">
                <span>{COMINGSOON}</span>
              </div>
              <div className="game-history">
                <span>{COMINGSOON}</span>
              </div>
              <div className="game-history">
                <span>{COMINGSOON}</span>
              </div>
              <div className="game-history">
                <span>{COMINGSOON}</span>
              </div>
            </div>

            <div id="drawings" className="tabcontent">
              <div className="history-pics">
                <span>{COMINGSOON}</span>
              </div>
              <div className="history-pics">
                <span>{COMINGSOON}</span>
              </div>
              <div className="history-pics">
                <span>{COMINGSOON}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
