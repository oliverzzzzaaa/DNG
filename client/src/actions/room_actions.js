import * as APIRoomUtil from "../util/room";
// import MySocket from "../socket";

export const RECEIVE_ALL_ROOMS = "RECEIVE_ALL_ROOMS";
export const RECEIVE_NEW_ROOM = "RECEIVE_NEW_ROOM";
export const RECEIVE_LEAVE_ROOM = "RECEIVE_LEAVE_ROOM";
export const RECEIVE_REMOVE_ROOM = "RECEIVE_REMOVE_ROOM";

const receiveAllRooms = rooms => ({
  type: RECEIVE_ALL_ROOMS,
  rooms
});

const receiveNewRoom = data => ({
  type: RECEIVE_NEW_ROOM,
  data
});

const receiveLeaveRoom = userId => ({
  type: RECEIVE_LEAVE_ROOM,
  userId
});

const removeRoom = id => ({
  type: RECEIVE_REMOVE_ROOM,
  id
});

export const receiveRemoveRoom = id => dispatch => {
  dispatch(removeRoom(id));
};

export const receiveRooms = rooms => dispatch =>
  dispatch(receiveAllRooms(rooms));

export const createRoom = userData => dispatch =>
  APIRoomUtil.createRoom(userData).then(data => {
    dispatch(receiveNewRoom(data.data));
    window.location.hash = `/room/${data.data.id}`;
  });

export const joinRoom = payload => dispatch =>
  APIRoomUtil.joinRoom(payload).then(data => {
    dispatch(receiveNewRoom(data.data));
    window.location.hash = `/room/${data.data.id}`;
  });

export const leaveRoom = userId => dispatch =>
  APIRoomUtil.leaveRoom(userId).then(() => dispatch(receiveLeaveRoom(userId)));

export const receiveRoom = room => dispatch => dispatch(receiveNewRoom(room));
