import { connect } from 'react-redux';
import { login } from "../../actions/session_actions";
import LoginForm from "./login_form";

const mSTP = state => ({
    user: state.session.user,
    errors: state.errors.session
});

const mDTP = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
});

export default connect(mSTP, mDTP)(LoginForm)