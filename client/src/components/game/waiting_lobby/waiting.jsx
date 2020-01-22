import React from 'react';
import "./waiting.css";
import Chat from '../chat/chat'
import ProfileIcon from '../../profile/profile_icon'

class Waiting extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return(
            <div className="waiting-room">
                <div className="waiting-room-profiles">
                    <ProfileIcon users={this.props.users} />
                    <div className="waiting-room-ready-button">
                        <button>Ready</button>
                    </div>
                </div>
                <div className="chat-component-div">
                    <Chat messages={this.props.messages}/>
                </div>
            </div>
        )
    }
}

export default Waiting;