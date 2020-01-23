import React from "react";
import Game from "../game/game";
import Chat from "../game/chat/chat";
import Waiting from "../game/waiting_lobby/waiting";
import "./room.css";

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    //have ready in state?
    this.state = {
      ready: true
    };
  }

  render() {
    const users = [
      {
        id: 1,
        username: "Yin",
        email: "yin@email.com",
        password: "password",
        image:
          "http://calligraphyalphabet.org/wp-content/uploads/roman-calligraphy-alphabet-y.jpg",
        score: 5,
        date: Date.now
      },
      {
        id: 2,
        username: "Oliver",
        email: "oliver@email.com",
        password: "password",
        image:
          "http://calligraphyalphabet.org/wp-content/uploads/roman-calligraphy-alphabet-o.jpg",
        score: 1,
        date: Date.now
      },
      {
        id: 3,
        username: "Johnson",
        email: "johnson@email.com",
        password: "password",
        image:
          "https://images-na.ssl-images-amazon.com/images/I/61LhNj3htIL._SL1500_.jpg",
        score: 3,
        date: Date.now
      },
      {
        id: 4,
        username: "Guanyao",
        email: "guanyao@email.com",
        password: "password",
        image:
          "https://ih0.redbubble.net/image.713977306.0352/fpp,small,lustre,wall_texture,product,750x1000.u8.jpg",
        score: 0,
        date: Date.now
      }
    ];

    let tempmessages = [
      { sender: "player1", body: "now can work on css" },
      { sender: "player2", body: "message two" },
      { sender: "player1", body: "message three" },
      { sender: "player2", body: "message four" },
      { sender: "player1", body: "message five" },
      { sender: "player2", body: "message six" },
      { sender: "player1", body: "message seven" },
      { sender: "player1", body: "message eight" },
      {
        sender: "player1",
        body: "message that is really really long and might go to the next line"
      },
      { sender: "player1", body: "message ten" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message 11" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message abc" },
      { sender: "player1", body: "message aaa" },
      { sender: "player1", body: "message banana" },
      { sender: "player1", body: "message cool" },
      { sender: "player1", body: "message pineapple" },
      { sender: "player1", body: "message apple bottom jeans" },
      { sender: "player1", body: "message haha" }
    ];
    return (
      <div className="room-div container-fluid">
        <div className="game-or-waiting-div">
          {this.state.ready ? <Game /> : (
            <div className="waiting-div"> 
              <Waiting messages={this.props.messages} users={users}/>
              <div className="room-chat-div">
                <Chat messages={tempmessages}/>
              </div>
            </div>)}
        </div>
      </div>
    );
  }
}



//Photo by Amy Shamblen on Unsplash
