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

        console.log(document.getElementById("pictionary-canvas"))
        document.getElementById("mid-round-img").src = document.getElementById("pictionary-canvas").toDataURL()

        console.log("SAVED")
    }

    ready() {
        //set user to be ready
    }

    render() {
        if (document.getElementById("pictionary-canvas")) {
            document.getElementById("mid-round-img").src = document.getElementById("pictionary-canvas").toDataURL()
        }
        let modalHeader = null;
        if (this.props.isDrawer) {
            modalHeader = (
                <span className="save-picture" onClick={this.savePicture}>Save Picture!</span>

            )
        } else {
            modalHeader = (
                <span className="rate-this-picture">Rate this picture!</span>
            )
        }

        return (
            <div className="mid-round-modal">
                {modalHeader}
                <div className="mid-round-img-div">
                    <img src="" id="mid-round-img"/>
                </div>
                <span className="game-rooms-create-text">

                    Ready
                </span>
            </div>
        )
    }
}

export default MidRound;