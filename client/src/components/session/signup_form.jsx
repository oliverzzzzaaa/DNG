import React from "react";
import { withRouter, Link } from "react-router-dom";
import paper from "paper";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      strokeColor: "black",
      strokeWidth: 3,
      errors: {}
    };
    this.canvas = React.createRef();
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDrag = this.onMouseDrag.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clear = this.clear.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidMount() {
    this.canvas.current.width = 350;
    this.canvas.current.height = 350;
    paper.setup(this.canvas.current);
    const tool = new paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);
    tool.onMouseUp = e => this.onMouseUp(e);
  }

  setStrokeWidth(n) {
    this.setState({
      strokeWidth: n
    });
  }

  clear() {
    paper.project.activeLayer.removeChildren();
    paper.view.draw();
  }

  onMouseDown(e) {
    if (this.path) {
      this.path.selected = false;
    }
    this.path = new paper.Path();
    this.path.strokeColor = this.state.strokeColor;
    this.path.strokeWidth = this.state.strokeWidth;
    this.path.strokeCap = "round";
    this.path.fullySelected = false;
  }

  onMouseDrag(event) {
    this.path.add(event.point);
  }

  onMouseUp(event) {
    this.path.fullySelected = false;
  }

  changeColor(e) {
    this.setState({ strokeColor: e.currentTarget.value });
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleSignup(e) {
    e.preventDefault();
    let { username, email, password } = this.state;
    this.props.signup({
      username,
      email,
      password,
      image: this.canvas.current.toDataURL()
    });
  }

  showErrors() {
    if (this.props.errors) {
      return (
        <ul className="session-errors-ul">
          <li className="session-errors-li">
            {Object.values(this.props.errors)}
          </li>
        </ul>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="session-main">
        <div className="session-left">
          <div className="session-canvas">
            <h1>Try to draw your profile picture!</h1>
            <h2>You can edit your picture anytime.</h2>
            <canvas className="profile-picture" ref={this.canvas}></canvas>
          </div>
          <label>
            Color palette
            <input type="color" onChange={this.changeColor} />
          </label>
          <button onClick={this.clear}>clear picture</button>
        </div>
        <div className="session-right">
          <div className="session-logo">
            <Link to="/">
              <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
            </Link>
          </div>
          <div className="session-input-fields">
            <label>
              Username:
              <br />
              <input
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
            </label>
            <br />
            <label>
              Email:
              <br />
              <input
                type="email"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
            </label>
            <br />
            <label>
              Password:
              <br />
              <input
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
            </label>
            {this.showErrors()}
            <div className="session-button">
              <button className="submit-button" onClick={this.handleSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
