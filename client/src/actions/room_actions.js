import * as APIRoomUtil from '../util/room';
// import MySocket from "../socket";

// export const RECEIVE_ALL_ROOMS = "RECEIVE_ALL_ROOMS";
export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";
export const RECEIVE_LEAVE_ROOM = "RECEIVE_LEAVE_ROOM";

const receiveNewRoom = data => ({
    type: RECEIVE_NEW_ROOM,
    data
})

const receiveLeaveRoom = userId => ({
    type: RECEIVE_LEAVE_ROOM,
    userId
})

export const createRoom = userData => dispatch => (
    APIRoomUtil.createRoom(userData)
        .then(data => {
            dispatch(receiveNewRoom(data));
            // console.log(data.data.roomId);
            window.location.hash = `/room/${data.data.roomId}`;
        })
)

export const joinRoom = payload =>  dispatch => (
    APIRoomUtil.joinRoom(payload)
        .then(data => dispatch(receiveNewRoom(data)))
)

export const leaveRoom = userId => dispatch => (
    APIRoomUtil.leaveRoom(userId)
        .then(() => dispatch(receiveLeaveRoom(userId)))
)

