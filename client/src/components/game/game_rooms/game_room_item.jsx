import React from "react";
import "./game_room_item.css";

class GameRoomItem extends React.Component{
    render(){
      const user = this.props.currentUser;
      user.roomId = this.props.room.id;
        return (
          <div 
            className="game-room-div"
            onClick={() => this.props.joinRoom(user)}
          >
            {this.props.room.players.map((player, i) => (
              <div className="game-room-player-container">
                <img className="game-room-player" src={player.image} alt="player-icon"/>
              </div>
            ))}
          </div>
        );
    }
}

export default GameRoomItem;
