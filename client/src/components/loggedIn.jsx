import React, { Component } from "react";
import openSocket from "socket.io-client";
class LoggedIn extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://localhost:5000"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = openSocket(endpoint);
    socket.on("WELCOME", data => this.setState({ response: data }));
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response ? <p>{response.data}</p> : <p>Loading...</p>}
      </div>
    );
  }
}
export default LoggedIn;
