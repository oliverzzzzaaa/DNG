import React from "react";
import GameRoomItem from "./game_room_item";
import "./game_rooms.css";
import JoinModal from "./modal";

class GameRooms extends React.Component {
  // constructor(props){
  //     super(props);
  // }
  // componentDidMount() {
  //   console.log(this.props.rooms);
  // }

  render() {
    // const rooms = Object.values(this.props.rooms);
    return (
      <div className="game-rooms-div">
        <div className="game-rooms-container">
          {this.props.rooms.map((room, idx) => (
            <GameRoomItem className="game-room-index" room={room} key={idx} />
          ))}
        </div>
        <div className="game-rooms-buttons">
          <div className="game-rooms-create-button">
            <span
              className="game-rooms-create-text"
              onClick={() => this.props.createRoom(this.props.currentUser)}
            >
              Create
            </span>
          </div>
          <JoinModal
            join={this.props.joinRoom}
            user={Object.assign({}, this.props.currentUser)}
          />
        </div>
      </div>
    );
  }
}

export default GameRooms;
