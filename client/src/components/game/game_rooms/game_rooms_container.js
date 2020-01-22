import { connect } from "react-redux";
import { createRoom, joinRoom } from "../../../actions/room_actions";
import GameRooms from './game_rooms';

const mSP = state => {
  const rooms = {
            1: {
                id: 1,
                players: [1, 2, 3],
                host: 1
            },
            2: {
                id: 2,
                players: [4,5,6,7],
                host: 7
            }
        };
  return({
  currentUser: state.session.user,
  rooms: Object.values(rooms)
      })
};

const mDP = dispatch => ({
  createRoom: userData => dispatch(createRoom(userData)),
  joinRoom: payload => dispatch(joinRoom(payload))
})

export default connect(mSP, mDP)(GameRooms)