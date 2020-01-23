import React from 'react'

class ProfileIconItem extends React.Component{

    render(){
        
        return(
            <div className="profile-icon-container">
                <div className="profile-icon-image-container">
                    <img
                        className="profile-icon-image"
                        src={this.props.user.image} 
                        alt=""
                    />
                </div>
                <div className="profile-icon-username-container"> 
                    <span className="profile-icon-username">{this.props.user.username}</span>
                </div>
            </div>
        )
    }
}

export default ProfileIconItem;