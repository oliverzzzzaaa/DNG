import React from "react";
import paper from "paper";

export default class ProfileIconEditor extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      color: "black",
      strokeWidth: 1,
      name: "place holder pass in from parent", // name: this.props.name,
      image: "place holder pass in from parent" // image: this.props.image
    };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDrag = this.onMouseDrag.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clear = this.clear.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    paper.setup(this.canvas.current);
    const tool = new paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);
    tool.onMouseUp = e => this.onMouseUp(e);
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
    // If we produced a path before, deselect it:
    if (this.path) {
      this.path.selected = false;
    }
    this.path = new paper.Path();
    this.path.strokeColor = this.state.color;
    this.path.strokeWidth = this.state.strokeWidth;
    this.path.strokeCap = "round";

    // Select the path, so we can see its segment points:
    this.path.fullySelected = false;
  }

  onMouseDrag(event) {
    this.path.add(event.point);
  }

  onMouseUp(event) {
    // When the mouse is released, simplify it:
    // this.path.simplify();

    this.path.fullySelected = false;
  }

  changeColor(e) {
    this.setState({ color: e.target.value });
  }

  updateChanges() {
    const data = {
      username: this.state.name,
      image: this.canvas.current.toDataURL()
    };
    console.log(data.username);
    alert("should fire a request with new info(data) to update user");
  }

  changeName(e) {
    this.setState({ name: e.currentTarget.value });
  }

  render() {
    return (
      <div className="profile-editor">
        <input type="text" value={this.state.name} onChange={this.changeName} />
        <input type="color" onChange={this.changeColor} />
        <button onClick={this.clear}>clear</button>
        <canvas className="profile-picture" ref={this.canvas}></canvas>
        <button onClick={this.updateChanges}>UPDATE</button>
      </div>
    );
  }
}
