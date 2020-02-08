import React from "react";
import paper from "paper";
import "./canvas.css";
import MySocket from "../../../socket";
import Instructions from "../game_rooms/instructions_modal";

export default class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      strokeColor: "black",
      strokeWidth: 1,
      instructions: false,
      isEraser: false
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
    this.tool = null;
    this.paper = new paper.PaperScope();
    this.useEraser = this.useEraser.bind(this);
    this.drawerName = this.drawerName.bind(this);
    this.showInstructions = this.showInstructions.bind(this);
    this.hideInstructions = this.hideInstructions.bind(this);
    this.usePen = this.usePen.bind(this);
  }

  componentDidMount() {
    this.paper.setup(document.getElementById("pictionary-canvas"));
    this.tool = new this.paper.Tool();
    this.tool.onMouseDown = this.onMouseDown;
    this.tool.onMouseDrag = this.onMouseDrag;
    this.tool.onMouseUp = this.onMouseUp;

    const strokes = this.props.strokes;
    if (strokes) {
      if (this.path) {
        this.path.selected = false;
      }
      strokes.forEach(stroke => {
        this.path = new this.paper.Path();
        this.path.strokeColor = stroke.color;
        this.path.strokeWidth = stroke.width;
        this.path.strokeCap = "round";
        this.path.pathData = stroke.pathData;
        this.paper.view.draw();
      });
    }

    const socket = MySocket.getSocket();
    socket.off("gameAction");
    socket.off("pathData");
    socket.off("clearDrawing");

    socket.on("pathData", data => {
      if (!this.props.isDrawer) {
        if (this.path) {
          this.path.selected = false;
        }
        this.path = new this.paper.Path();
        this.path.strokeColor = data.color;
        this.path.strokeWidth = data.width;
        this.path.strokeCap = "round";
        this.path.pathData = data.pathData;
        this.paper.view.draw();
      }
    });

    socket.on("clearDrawing", data => {
      if (!this.props.isDrawer) {
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

  useEraser() {
    this.setState({
      isEraser: true
    });
  }

  usePen() {
    this.setState({
      isEraser: false
    });
  }

  clear() {
    this.paper.project.activeLayer.removeChildren();
    this.paper.view.draw();
  }

  onMouseDown(e) {
    if (this.props.isDrawer) {
      // If we produced a path before, deselect it:
      if (this.path) {
        this.path.selected = false;
      }
      this.path = new this.paper.Path();
      this.path.strokeColor = this.state.isEraser
        ? "white"
        : this.state.strokeColor;
      this.path.strokeWidth = this.state.isEraser ? 20 : this.state.strokeWidth;
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
        color: this.state.isEraser ? "white" : this.state.strokeColor,
        width: this.state.isEraser ? 20 : this.state.strokeWidth
      }
    });
  }

  renderColorpicker() {
    if (this.props.isDrawer) {
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
            onClick={this.usePen}
            className={`canvas-bottom-button ${
              !this.state.isEraser ? "selected" : ""
            }`}
          >
            Pen
          </button>
          <br />
          <button
            onClick={this.useEraser}
            className={`canvas-bottom-button ${
              this.state.isEraser ? "selected" : ""
            }`}
          >
            Eraser
          </button>
          <br />
          <button
            onClick={() => this.setStrokeWidth(2)}
            className="canvas-bottom-button"
          >
            Thin
          </button>
          <br />
          <button
            onClick={() => this.setStrokeWidth(10)}
            className="canvas-bottom-button"
          >
            Thick
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
            Clear
          </button>
        </div>
      );
    }
    return null;
  }

  drawerName() {
    const players = Object.values(this.props.players);
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === this.props.currDrawer) {
        return players[i].name;
      }
    }
  }

  showInstructions() {
    if (this.state.instructions) {
      this.setState({ instructions: false });
    } else {
      this.setState({ instructions: true });
    }
  }

  hideInstructions() {
    this.setState({ instructions: false });
  }

  render() {
    return (
      <div className="canvas-page">
        <div onClick={this.showInstructions} className="instructions-button">
          Instructions
        </div>
        {/* <span className="drawer-viewer">{`you are the ${
          this.props.isDrawer ? "drawer" : "viewer"
        }!`}</span> */}
        <div className="canvas-main">
          <canvas className="canvas-area" id="pictionary-canvas" />
        </div>
        <span className="drawer-viewer">{`${this.drawerName()} is the drawer!`}</span>
        {this.state.instructions ? (
          <Instructions hideInstructions={this.hideInstructions} />
        ) : null}
        {this.renderColorpicker()}
        {/* <div className="clues">clues right here!</div> */}
      </div>
    );
  }
}
