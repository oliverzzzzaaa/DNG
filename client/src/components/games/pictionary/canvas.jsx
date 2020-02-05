import React from "react";
import paper from "paper";
import "./canvas.css";
import MySocket from "../../../socket";

export default class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeColor: "black",
      strokeWidth: 1
    };
    this.path = null;
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDrag = this.onMouseDrag.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setStrokeWidth = this.setStrokeWidth.bind(this);
    this.uploadDrawing = this.uploadDrawing.bind(this);
    this.clear = this.clear.bind(this);
    this.renderColorpicker = this.renderColorpicker.bind(this);
  }

  componentDidMount() {
    paper.setup(document.getElementById("pictionary-canvas"));
    const tool = new paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);
    tool.onMouseUp = e => this.onMouseUp(e);

    const strocks = this.props.strocks;
    if (strocks) {
      strocks.forEach(strock => {
        const path = new paper.Path();
        path.strokeColor = strock.color;
        path.strokeWidth = strock.width;
        path.strokeCap = "round";
        path.pathData = strock.pathData;
        paper.view.draw();
      });
    }

    const socket = MySocket.getSocket();
    socket.off("gameAction");
    socket.on("pathData", data => {
      if (this.props.isDrawer !== true) {
        const path = new paper.Path();
        path.strokeColor = data.color;
        path.strokeWidth = data.width;
        path.strokeCap = "round";
        path.pathData = data.pathData;
        paper.view.draw();
      }
    });

    socket.on("clearDrawing", data => {
      if (this.props.isDrawer !== true) {
        this.clear();
      }
    });
  }

  setColor(e) {
    this.setState({
      strokeColor: e.currentTarget.value
    });
  }

  setStrokeWidth(n) {
    this.setState({
      strokeWidth: n
    });
  }

  clear() {
    paper.project.activeLayer.removeChildren();
    paper.view.draw();
  }

  onMouseDown(e) {
    if (this.props.isDrawer) {
      // If we produced a path before, deselect it:
      if (this.path) {
        this.path.selected = false;
      }
      this.path = new paper.Path();
      this.path.strokeColor = this.state.strokeColor;
      this.path.strokeWidth = this.state.strokeWidth;
      this.path.strokeCap = "round";

      // Select the path, so we can see its segment points:
      this.path.fullySelected = false;
    }
  }

  onMouseDrag(event) {
    if (this.props.isDrawer) {
      // Every drag event, add a point to the path at the current
      // position of the mouse:
      this.path.add(event.point);
    }
  }

  onMouseUp(event) {
    if (this.props.isDrawer) {
      // When the mouse is released, simplify it:
      // this.path.simplify();

      // Select the path, so we can see its segments:
      this.path.fullySelected = false;
      this.uploadDrawing();
    }
  }

  uploadDrawing() {
    MySocket.getSocket().emit("gameAction", {
      game: "Pictionary",
      type: "pathData",
      params: {
        pathData: this.path.pathData,
        color: this.state.strokeColor,
        width: this.state.strokeWidth
      }
    });
  }

  renderColorpicker() {
    if (this.props.isDrawer === true) {
      return (
        <div className="color-picker-btn">
          <input
            className="canvas-bottom-button"
            type="color"
            value={this.state.strokeColor}
            onChange={this.setColor}
          />
          <br />
          <button
            onClick={() => this.setStrokeWidth(2)}
            className="canvas-bottom-button"
          >
            thin
          </button>
          <br />
          <button
            onClick={() => this.setStrokeWidth(10)}
            className="canvas-bottom-button"
          >
            thick
          </button>
          <br />
          <button
            className="canvas-bottom-button"
            onClick={() => {
              this.clear();
              MySocket.getSocket().emit("gameAction", {
                game: "Pictionary",
                type: "clearDrawing"
              });
            }}
          >
            clear
          </button>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="canvas-page">
        <div className="canvas-main">
          {`you are the ${this.props.isDrawer ? "drawer" : "viewer"}!`}
          <canvas className="canvas-area" id="pictionary-canvas" />
        </div>
        {this.renderColorpicker()}
        <div className="clues">clues right here!</div>
      </div>
    );
  }
}
