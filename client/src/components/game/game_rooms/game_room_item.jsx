import React from 'react';
import './game_room_item.css'

class GameRoomItem extends React.Component{
    render(){
        return(
            <div className="game-room-div">
                {this.props.room.players.map((player, i) => (
                    <span className="game-room-player" key={i}>{player}</span>
                ))}
            </div>
        )
    }
}

export default GameRoomItem;