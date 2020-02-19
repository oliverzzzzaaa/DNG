import React from "react";
import { withRouter, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.showErrors = this.showErrors.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({ [field]: e.currentTarget.value });
  }

  handleLogin(e) {
    let { email, password } = this.state;
    e.preventDefault();
    this.props.login({ email, password });
  }

  handleDemo(e) {
    this.props.demoUser();
  }

  showErrors() {
    if (this.props.errors.message) {
      return (
        <ul className="session-errors-ul">
          <li className="session-errors-li">
            {Object.values(this.props.errors.response.data)}
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
          <h1>Pictures drawn by our users!</h1>
          <div className="carousels">
            <Carousel>
              <Carousel.Item>
                <img src="https://pictionary-images.s3-us-west-1.amazonaws.com/userId3.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c2.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c3.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c4.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c5.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c6.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c7.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c8.png" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/c9.png" />
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="session-button">
            <Link to="/signup">
              <button className="submit-button">
                Interested? Sign Up Here!
              </button>
            </Link>
          </div>
        </div>

        <div className="session-right">
          <div className="session-logo">
            <Link to="/">
              <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
            </Link>
          </div>
          <div className="session-input-fields">
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
          </div>
          <br />
          {this.showErrors()}
          <br />
          <div className="session-button">
            <button className="submit-button" onClick={this.handleLogin}>
              Sign In
            </button>
            <button className="submit-button" onClick={this.handleDemo}>
              Guest
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
