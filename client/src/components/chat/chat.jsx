import React from "react";
import "./chat.css";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.renderMessages = this.renderMessages.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  renderMessages() {
    if (this.props.messages) {
      return (
        <ul className="msg-list">
          {this.props.messages.map((msg, i) => (
            <li key={i} className="msg-body">
              {
                // user icon is better to have its own component
              }
              <div className="user-icon">{msg.sender}:</div>
              {msg.body}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  }

  keyPress(e) {
    if (e.keyCode === 13 && e.currentTarget.value !== "") {
      if (this.props.action) {
        this.props.action(e.currentTarget.value);
      }
    }
  }

  handleChange(e) {
    this.setState({
      message: e.currentTarget.value
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="msg-container">{this.renderMessages()}</div>
        <div className="chat-input">
          <input
            onKeyDown={this.keyPress}
            onChange={this.handleChange}
            type="text"
            value={this.state.message}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
