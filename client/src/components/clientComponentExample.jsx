import React, { Component } from "react";
import MySocket from "../socket";

class ClientComponentExample extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
  }
  componentDidMount() {
    const socket = MySocket.getSocket();
    socket.emit("WELCOME", {});
    socket.emit("login", { userId: Math.ceil(Math.random() * 10000) });
    socket.on("WELCOME", data => this.setState({ response: data }));
    socket.on("roomActivities", data => console.log(data));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? <p>{response.msg}</p> : <p>Loading...</p>}
      </div>
    );
  }
}
export default ClientComponentExample;
