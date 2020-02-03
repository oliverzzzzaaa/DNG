import openSocket from "socket.io-client";
export default class MySocket {
  socket;
  static getSocket = userId => {
    if (MySocket.socket === undefined) {
      const port = process.env.PORT || 5000;
      let endpoint = `http://localhost:5000`;
      if (process.env.NODE_ENV === "production") {
        endpoint = `${window.location.hostname}:${port}`;
      }
      MySocket.socket = openSocket(endpoint);
      if (userId) {
        MySocket.socket.emit("login", { userId: userId });
      }
    }
    return MySocket.socket;
  };
}
