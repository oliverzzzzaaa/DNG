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
                    <button className="waiting-room-ready2">Ready</button>
                </div>
                {/* <div className="waiting-room-ready-button">
                    <button>Ready</button>
                </div> */}
            </div>
        )
    }
}

export default Waiting;