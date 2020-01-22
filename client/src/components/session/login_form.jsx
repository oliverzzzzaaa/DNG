import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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
        let { email, password } = this.state;
        let guest = {
            email: "guest_user@dng.com",
            password: "guestdng"
        };
        return(e) => {
            e.preventDefault();
            this.props.login(guest);
        };
    }

    showErrors() {
        return (
            <ul className="splash-errors">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-main">
                <div className="session-image">
                </div>
                <div className='session-left'>
                    <h3>
                        This will be the Logo div link back home page
                    </h3> 
                    
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

                    <div className="session-errors">
                        {this.showErrors()}
                    </div>
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