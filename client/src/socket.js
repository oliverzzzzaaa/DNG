import openSocket from "socket.io-client";
export default class MySocket {
  socket;
  static getSocket = (userId) => {
    if (MySocket.socket === undefined) {
      const endpoint = "http://localhost:5000";
      MySocket.socket = openSocket(endpoint);
    }
    // MySocket.socket.emit("login", { userId:1 });
    return MySocket.socket;
  };
}
