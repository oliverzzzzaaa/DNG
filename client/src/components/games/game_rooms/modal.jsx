import React from "react";
import { Modal, Button } from "react-bootstrap";
import './modal.css';

export default class JoinModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      roomId: ""
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.updateRoomId = this.updateRoomId.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  //   const [show, setShow] = useState(false);
  handleClose() {
    this.setState({ show: false, roomId: "" });
  }

  handleShow(e) {
    this.setState({ show: true });
  }

  updateRoomId(e) {
    this.setState({
      roomId: e.currentTarget.value
    });
  }

  handleJoin() {
    const user = this.props.user;
    user.roomId = this.state.roomId;
    this.props.join(user);
    this.handleClose();
  }

  render() {
    return (
      <div className="join-room-btn">
        <span className="join-room-text" onClick={this.handleShow}>
          Join
        </span>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Join a room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Enter Room Id:
              <input
                type="text"
                value={this.state.roomId}
                onChange={this.updateRoomId}
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleJoin}>
              Join
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
