import NarBar from './nav_bar';
import { logout } from "../../actions/session_actions";
import { connect } from "react-redux";

const mSTP = state => {
    return ({
        loggedIn: state.session.isAuthenticated,
        currentUserId: state.session.user.id,
    })
};

const mDTP = dispatch => ({
    logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(NarBar);