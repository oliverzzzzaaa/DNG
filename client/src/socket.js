import io from "socket.io-client";
export default class MySocket {
  socket;
  static getSocket = userId => {
    if (MySocket.socket === undefined) {
      // let endpoint = `http://localhost:5000`;
      // if (process.env.NODE_ENV === "production") {
      //   endpoint = `http://${window.location.hostname}`;
      // }
      MySocket.socket = io();
      if (userId) {
        MySocket.socket.emit("login", { userId: userId });
      }
    }
    return MySocket.socket;
  };
}
