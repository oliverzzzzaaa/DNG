import React from "react";
import Lobby from "./main/lobby";
import Chat from "./chat/chat";
import CanvasContainer from "./game/canvas";

export default {
  title: "Watch"
};

const click = () => {
  alert(1);
  console.log("click");
};
export const Loby = () => <Lobby msg={"I'm from parent"} click={click} />;

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
const sendMsgInGame = msg => {
  alert(msg);
};
export const ChatComponentExample = () => (
  <Chat messages={messages} action={sendMsgInGame} />
);

export const DrawerAndViewer = () => (
  <div style={{ border: "1px solid red", position: "relative" }}>
    <CanvasContainer isDrawer={true} />
  </div>
);
export const WaitingExample = () => (
  <Waiting messages={messages} action={sendMsgInGame} />
)
