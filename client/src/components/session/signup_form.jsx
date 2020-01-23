import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './session.css';

class SignupForm extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: {}
        };
        this.handleSignup = this.handleSignup.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return (e) => this.setState({[field]: e.currentTarget.value});
    }

    handleSignup() {
        let { username, email, password } = this.state;
        return (e) => {
            e.preventDefault();
            this.props.signup({ username, email, password });
        };
    }

    showErrors() {
        return (
            <ul className="session-errors-ul">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`} className="session-errors-li">
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return(
            <div className="session-main">
                <div className="session-image">
                </div>
                <div className='session-left'>
                    <h3>
                        This will be the Logo div link back home page
                    </h3> 
                    <form onSubmit={this.handleSignup}>
                        <label>
                            Username:
                            <br/>
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                placeholder="Username"
                            />
                        </label>
                        <br/>
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
                        <div className="session-errors">
                            {this.showErrors()}
                        </div>
                        <div className='session-button'>
                            <button className='submit-button' onClick={this.handleSignup()}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

};

export default withRouter(SignupForm);