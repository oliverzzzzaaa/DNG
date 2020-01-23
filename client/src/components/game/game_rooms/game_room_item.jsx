import React from 'react';
import './game_room_item.css'

class GameRoomItem extends React.Component{
    render(){
        return (
          <div className="game-room-div">
            {/* {console.log(this.props)} */}
            {this.props.room.players.map((player, i) => (
                    <span className="game-room-player" key={i}>{player.image}</span>
                ))}
            game room item
          </div>
        );
    }
}

export default GameRoomItem;