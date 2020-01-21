import openSocket from "socket.io-client";

export default class MySocket {
  socket;
  static getSocket = () => {
    if (MySocket.socket === undefined) {
      const endpoint = "http://localhost:5000";
      MySocket.socket = openSocket(endpoint);
    }
    return MySocket.socket;
  };
}
