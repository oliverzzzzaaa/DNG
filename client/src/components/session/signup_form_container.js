import { connect } from  'react-redux';
import { login, signup, clearErrors } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = state => ({
    signedIn: state.session.isLogedIn,
    errors: state.errors.session
});

const mDTP = dispatch => ({
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(SignupForm)
