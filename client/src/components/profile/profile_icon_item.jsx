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
                    <span className="profile-icon-username">{this.props.user.name}</span>
                    {this.props.user.ready ? (<div className="check-or-x">&#x2714;</div>) : (<div className="check-or-x">&#x274C;</div>)}
                </div>
            </div>
        )
    }
}

export default ProfileIconItem;