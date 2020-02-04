import { connect } from "react-redux";
import User from "./user";
import { fetchUser } from "../../actions/user_actions";

const mSP = (state, ownProps) => ({
    currentUser: state.session.user,
    user: state.users[ownProps.match.params.userId]
});

const mDP = dispatch => ({
    fetchUser: user => dispatch(fetchUser(user))
});

export default connect(mSP, mDP)(User);