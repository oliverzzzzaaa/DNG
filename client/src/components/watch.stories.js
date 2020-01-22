import React from "react";
import Lobby from "./main/lobby";
import Waiting from "./game/waiting_lobby/waiting"
// import Chat from "./chat/chat";
// import CanvasContainer from "./game/canvas";
// import ProfileIcon from "./profile/profile_icon";

export default {
  title: "Watch"
};

const click = () => {
  alert(1);
  console.log("click");
};

const messages = [{ sender: "player1", body: "now can work on css" },
{ sender: "player2", body: "message two"},
{ sender: "player1", body: "message three"},
{ sender: "player2", body: "message four"},
{ sender: "player1", body: "message five"},
{ sender: "player2", body: "message six"},
{ sender: "player1", body: "message seven"},
{ sender: "player1", body: "message eight"},
{ sender: "player1", body: "message that is really really long and might go to the next line"},
{ sender: "player1", body: "message ten"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
{ sender: "player1", body: "message 11"},
];

const users = [
  {
    id: 1,
    username: "Yin",
    email: "yin@email.com",
    password: "password",
    image: "http://calligraphyalphabet.org/wp-content/uploads/roman-calligraphy-alphabet-y.jpg",
    score: 5,
    date: Date.now
  },
  {
    id: 2,
    username: "Oliver",
    email: "oliver@email.com",
    password: "password",
    image: "http://calligraphyalphabet.org/wp-content/uploads/roman-calligraphy-alphabet-o.jpg",
    score: 1,
    date: Date.now
  },
  {
    id: 3,
    username: "Johnson",
    email: "johnson@email.com",
    password: "password",
    image: "https://images-na.ssl-images-amazon.com/images/I/61LhNj3htIL._SL1500_.jpg",
    score: 3,
    date: Date.now
  },
  {
    id: 4,
    username: "Guanyao",
    email: "guanyao@email.com",
    password: "password",
    image: "https://ih0.redbubble.net/image.713977306.0352/fpp,small,lustre,wall_texture,product,750x1000.u8.jpg",
    score: 0,
    date: Date.now
  }
]

const sendMsgInGame = msg => {
  alert(msg);
};
// export const ChatComponentExample = () => (
  //   <Chat messages={messages} action={sendMsgInGame} />
  // );
  
  // export const DrawerAndViewer = () => (
    //   <div style={{ border: "1px solid red", position: "relative" }}>
    //     <CanvasContainer isDrawer={true} />
    //   </div>
    // );
export const WaitingExample = () => (
      <Waiting messages={messages} action={sendMsgInGame} users={users} />
      )

export const Loby = () => <Lobby msg={"I'm from parent"} click={click} />;