import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css'

class NarBar extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.logout();
    }


    render(){
        if (typeof currentUser === undefined) return null;
        return (
          <div className="nav-bar-main">
            <div className="nav-bar-container">
              <Link to="/" className="navbar-logo">
                <img src="https://active-storage-rotten-egg-dev.s3-us-west-1.amazonaws.com/logo_reduced.png" />
              </Link>
              <div className="nav-bar-button">
                <button className="nav-bar-logout">
                  <Link
                    to={`/users/${this.props.currentUserId}`}
                    className="disabled-link"
                  >
                    Profile!
                  </Link>
                </button>
                <button className="nav-bar-logout" onClick={this.handleLogout}>
                  Bye!
                </button>
              </div>
            </div>
          </div>
        );
    }

}

export default NarBar;