import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
        return (e) => this.setState({ [field]: e.currentTarget.value });
    }

    handleLogin() {
        let { email, password } = this.state;
        return(e) => {
            e.preventDefault();
            this.props.login({ email, password });
        };
    }

    handleDemo() {
        this.state = {
            email: "guest_user@dng.com",
            password: "guestdng"
        };
        let guest = this.state
        return(e) => {
            e.preventDefault();
            this.props.login(guest);
        };
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
        };
    }

    render() {
        return (
            <div className="session-main">
                <div className="session-image">
                </div>
                <div className='session-left'>
                    <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo.png" />
                    <div className="session-input-fields">
                        <label>
                            Email:
                            <br/>
                            <input type="email"
                                value={this.state.email}
                                onChange={this.update('email')}
                                placeholder="Email"
                            />
                        </label>
                        <br/>
                        <label>
                            Password:
                            <br/>
                            <input type="password"
                                value={this.state.password}
                                onChange={this.update('password')}
                                placeholder="Password"
                            />
                        </label>
                    </div>
                    {this.showErrors()}
                    <div className='session-button'>
                        <button className='submit-button' onClick={this.handleLogin()}>Sign In</button>
                        <button className='submit-button' onClick={this.handleDemo()}>Guest</button>
                    </div>
                </div>
            </div>
        )
    }
};

export default withRouter(LoginForm);