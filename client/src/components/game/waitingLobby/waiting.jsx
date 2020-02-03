import React from "react";
import "./waiting.css";
import ProfileIcon from "../../profile/profile_icon";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { leaveRoom } from "../../../util/room";

class Waiting extends React.Component {
  constructor(props) {
    super(props);
    this.leave = this.leave.bind(this);
  }

  leave() {
    leaveRoom(this.props.currentUserId).then(
      () => (window.location.hash = "/lobby")
    );
  }

  render() {
    return (
      <div className="waiting-room">
        <div className="waiting-room-profiles">
          <ProfileIcon users={this.props.users} />
          {/* <button className="waiting-room-ready2">Ready</button> */}
          {/* <button className="btn btn-info">Ready</button> */}
          <div className="ready-button-div">
            <Button
              variant="warning outline-light"
              className="waiting-leave"
              onClick={this.leave} 
            >
              Leave
            </Button>
            <Button variant="warning outline-light">Ready</Button>
          </div>
        </div>
        {/* <div className="waiting-room-ready-button">
                    <button>Ready</button>
                </div> */}
      </div>
    );
  }
}

export default Waiting;
