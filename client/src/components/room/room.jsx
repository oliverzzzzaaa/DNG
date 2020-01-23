import React from "react";
import Game from "../game/game";
import Chat from '../game/chat/chat'
import Waiting from '../game/waiting_lobby/waiting'
import './room.css'

export default class Room extends React.Component {
  
  constructor(props) {
    super(props)
    //have ready in state?
    this.state = {
      ready: false
    }
  }







  render() {

    return (
      <div className="room-div">
        <div className="game-or-waiting-div">
          {this.state.ready ? <Game /> : <Waiting messages={this.props.messages} users={this.props.users}/>}
        </div>
        <div className="room-chat-div">
          <Chat />
        </div>
      </div>
    )
  } 
}
