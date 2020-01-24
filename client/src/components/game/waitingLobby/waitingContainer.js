import { connect } from "react-redux";
import WaitingRoom from "./waiting";

const mSP = state => ({
  currentUserId: state.session.user.id
});

const mDP = dispatch => ({});

export default connect(mSP, mDP)(WaitingRoom);
