import React from 'react';
import "./waiting.css";
import Chat from '../chat/chat'

class Waiting extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <div className="chat-component-div">
                    <Chat messages={this.props.messages}/>
                </div>
            </div>
        )
    }
}

export default Waiting;