import React, { Component } from "react";
import MySocket from "../socket";

class Client2 extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
    // use MySocket.getSocket() to retrieve socket
    this.socket = MySocket.getSocket();
    this.send = this.send.bind(this);
  }
  componentDidMount() {
    // use socket.on to add a listener for a certain type of msg
    // first arg specify the msg type, in this case is "SOMERESPONSETYPE"
    // second arg is a callback fuction witch will be invoked if server emit a "SOMERESPONSETYPE" type msg
    this.socket.on("SOMERESPONSETYPE", data =>
      this.setState({ response: data })
    );
  }

  send() {
    // use socket.emit to send msg to server
    // first arg will specify msg type, in this case is "SOMEACTIONTYPE"
    // second arg is the data that will be sent to server
    // then on server side, the listener socket.on("SOMEACTIONTYPE", ...) will response to this emit
    this.socket.emit("SOMEACTIONTYPE", {
      data: "this obj will send to server"
    });
  }

  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        <button onClick={this.send}>click to send msg to server</button>
        {response ? (
          <p>{response.msg}</p>
        ) : (
          <p>Waiting for server response...</p>
        )}
      </div>
    );
  }
}
export default Client2;
