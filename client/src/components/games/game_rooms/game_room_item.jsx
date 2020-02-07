import React from "react";
import "./game_room_item.css";

class GameRoomItem extends React.Component {
  render() {
    const user = Object.assign({}, this.props.currentUser);
    user.roomId = this.props.room.id;
    return (
      <div>
        <p>{user.roomId}</p>
        {this.props.room.onGame ? "ongoing" : "waiting"}
        <div
          className="game-room-div"
          onClick={() => this.props.joinRoom(user)}
        >
          {this.props.room.players.map((player, i) => (
            <div className="game-room-player-container" key={i}>
              <img className="game-room-player" src={player.image} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GameRoomItem;
