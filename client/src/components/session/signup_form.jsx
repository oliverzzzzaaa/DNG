import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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
        return(
            <div className="splash-signup-main">
                <div className='splash-logo'> 
                    <Link to='/'/>This will be the Logo div
                </div>
                <div className="input-fields">
                    <input type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                        placeholder="username"
                    />
                    <input type="email"
                        value={this.state.email}
                        onChange={this.update('email')}
                        placeholder="email"
                    />
                    <input type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        placeholder="password"
                    />
                </div>
                <div className="splash-errors">
                    {this.showErrors()}
                </div>
                <div className='splash-button'>
                    <button className='submit-button' onClick={this.handleSignup()}>Sign Up</button>
                </div>
            </div>
        )
    }

};

export default withRouter(SignupForm);