import { connect } from "react-redux";
import User from "./user";
import { fetchUser, updateProfile } from "../../actions/user_actions";
import { newName } from '../../actions/session_actions';

const mSP = (state, ownProps) => {
  const user = state.users[ownProps.match.params.userId];
  if (user) {
    return {
      userId: user.id,
      image: user.image,
      username: user.username
    };
  }
  return {};
};

const mDP = dispatch => ({
  fetchUser: user => dispatch(fetchUser(user)),
  updateProfile: (id, user) => dispatch(updateProfile(id, user)),
  newName: (name) => dispatch(newName(name))
});

export default connect(mSP, mDP)(User);
