import NarBar from './nav_bar';
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";

const mSTP = state => ({
    loggedIn: state.session.isAuthenticated,
    currentUser: state.session.user
});

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(NarBar);