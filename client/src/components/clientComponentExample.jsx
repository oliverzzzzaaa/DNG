import React, { Component } from "react";

class ClientComponentExample extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
  }
  componentDidMount() {
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
