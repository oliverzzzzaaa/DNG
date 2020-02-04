import React from "react";
import "./profile_icon.css";
import ProfileIconItem from "./profile_icon_item";

class ProfileIcon extends React.Component {

  render() {
    
    return (
      <div className="profile-icons-container">
        {this.props.users.map(user => (
          <div>
            <ProfileIconItem user={user} key={user.id} />
          </div>
        ))}
      </div>
    );
  }
}

export default ProfileIcon;
