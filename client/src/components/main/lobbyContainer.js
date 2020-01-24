import { connect } from "react-redux";
import Lobby from "./lobby";
import {
  receiveRooms,
  receiveRoom,
  createRoom,
  joinRoom,
  receiveRemoveRoom
} from "./../../actions/room_actions";
// import receiveRooms

// delete this
// function receiveRooms(rooms) {
//   return {
//     type: "HI",
//     rooms
//   };
// }

const mapStateToProps = state => ({
  currentUser: state.session.user,
  rooms: Object.values(state.rooms)
});

const mapDispatchToProps = dispatch => ({
  receiveRooms: rooms => dispatch(receiveRooms(rooms)),
  receiveRoom: room => dispatch(receiveRoom(room)),
  createRoom: userData => dispatch(createRoom(userData)),
  joinRoom: payload => dispatch(joinRoom(payload)),
  removeRoom: id => dispatch(receiveRemoveRoom(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
