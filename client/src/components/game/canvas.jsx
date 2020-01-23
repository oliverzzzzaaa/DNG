import React from "react";
import paper from "paper";
import "./canvas.css";
import MySocket from "../../socket";

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
  }

  componentDidMount() {
    paper.setup(document.getElementById("pictionary-canvas"));
    const tool = new paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);
    tool.onMouseUp = e => this.onMouseUp(e);
    MySocket.getSocket().on("pathData", data => {
      console.log("receiving drawing from others");
      if (this.props.isDrawer !== true) {
        const path = new paper.Path();
        path.strokeColor = data.color;
        path.strokeWidth = data.width;
        path.strokeCap = "round";
        path.pathData = data.pathData;

        paper.view.draw();
      }
    });
    MySocket.getSocket().on("clearDrawing", data => {
      console.log("receiving drawing from others");
      if (this.props.isDrawer !== true) {
        this.clear();
      }
    });
  }

  setColor(color) {
    this.setState({
      strokeColor: color
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
      console.log(paper.project.activeLayer);
    }
  }

  uploadDrawing() {
    MySocket.getSocket().emit("pathData", {
      pathData: this.path.pathData,
      color: this.state.strokeColor,
      width: this.state.strokeWidth
    });
  }

  render() {
    return (
      <div>
        {`you are the ${this.props.isDrawer ? "drawer" : "viewer"}!`}
        <canvas id="pictionary-canvas" />
        <div className="color-picker-btn">
          {
            //TODO: this is just an example, needed change later
          }
          <br style={{ color: "black" }} />
          <button className='canvas-bottom-button'
            style={{ background: "black", color: "white" }}
            onClick={() => this.setColor("black")}
          >
            Black
          </button>
          <button className='canvas-bottom-button'
            style={{ background: "red", color: "white" }}
            onClick={() => this.setColor("red")}
          >
            Red
          </button>
          <button onClick={() => this.setStrokeWidth(2)} className='canvas-bottom-button' >thin</button>
          <button onClick={() => this.setStrokeWidth(10)} className='canvas-bottom-button' >thick</button>
          <button className='canvas-bottom-button'
            onClick={() => {
              this.clear();
              MySocket.getSocket().emit("clearDrawing");
            }}
          >
            clear
          </button>
        </div>
      </div>
    );
  }
}
