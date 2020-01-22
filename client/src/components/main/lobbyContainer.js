import { connect } from "react-redux";
import Lobby from "./lobby";
// import receiveRooms

// delete this
function receiveRooms(rooms) {
  alert(JSON.stringify(rooms));
  return {
    type: "HI"
  };
}

const mapStateToProps = state => ({
  currentUser: state.session.user
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
