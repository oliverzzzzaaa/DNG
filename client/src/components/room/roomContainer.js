import { connect } from "react-redux";
import Room from "./room";

const mSP = (state, ownProps) => ({
  currentUser: state.session.user,
  room: state.rooms[ownProps.match.params.id]
});

const mDP = dispatch => ({});

export default connect(mSP, mDP)(Room);
