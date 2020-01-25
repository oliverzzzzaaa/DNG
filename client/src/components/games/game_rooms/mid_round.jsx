import React from 'react';
import { Button } from "react-bootstrap";
import './mid_round.css'

class MidRound extends React.Component {
    constructor(props) {
        super(props)
        this.savePicture = this.savePicture.bind(this)
        this.state = {
            show: true
        }
    }


    handleClose() {
        this.setState({ show: false, roomId: "" });
      }
    
    handleShow() {
    this.setState({ show: true });
    }

    savePicture() {
        console.log("SAVED")
    }

    ready() {
        //set user to be ready
    }

    render() {
        let modalHeader = null;
        if (this.props.isDrawer) {
            modalHeader = (
                <span className="save-picture">Save Picture!</span>
            )
        } else {
            modalHeader = (
                <span className="rate-this-picture">Rate this picture!</span>
            )
        }

        return (
            <div className="mid-round-modal">
                {modalHeader}
                <div>
                    {/* {insert image here} */}
                </div>
                <span
                    className="game-rooms-create-text"
                    onClick={() => this.props.createRoom(this.props.currentUser)}>
                    Ready
                </span>
            </div>
        )
    }
}

export default MidRound;