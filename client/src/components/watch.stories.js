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

const messages = [{ sender: "player1", body: "now can work on css" }];
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
