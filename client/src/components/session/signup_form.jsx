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

    handleSignup(e) {
        e.preventDefault();
        this.props.signup(this.state);
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
            return null
        }
    };

    render() {
        return(
            <div className="session-main">
                <div className="session-image">
                </div>
                <div className='session-left'>
                    <div className='session-logo'>
                        <Link to='/'>
                            <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
                        </Link>
                    </div>
                    <div className="session-input-fields">
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
                        {this.showErrors()}
                        <div className='session-button'>
                            <button className='submit-button' onClick={this.handleSignup}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

};

export default withRouter(SignupForm);