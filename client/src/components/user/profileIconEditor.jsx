import React from "react";
import paper from "paper";

export default class ProfileIconEditor extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.state = {
      strokeColor: "black",
      strokeWidth: 3,
      changeImage: false,
      name: this.props.name, // name: this.props.name,
      image: this.props.image // image: this.props.image
    };
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDrag = this.onMouseDrag.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clear = this.clear.bind(this);
    this.updateChanges = this.updateChanges.bind(this);
    this.changeName = this.changeName.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  componentDidMount() {
    this.canvas.current.width = 250;
    this.canvas.current.height = 250;
    paper.setup(this.canvas.current);
    const tool = new paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);
    tool.onMouseUp = e => this.onMouseUp(e);
    const raster = new paper.Raster({
      source: this.state.image,
      position: paper.view.center
    });
    raster.scale(0.5);
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
    // alert('mouse')
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

  onMouseDrag(event) {
    this.path.add(event.point);
  }

  onMouseUp(event) {
    // When the mouse is released, simplify it:
    // this.path.simplify();

    this.path.fullySelected = false;
  }

  changeColor(e) {
    this.setState({ strokeColor: e.currentTarget.value });
  }

  updateChanges() {
    const data = {
      username: this.state.name
    };
    if (this.state.changeImage) {
      data.image = this.canvas.current.toDataURL();
    }
    this.props.update(data);
    this.props.close();
  }

  changeName(e) {
    this.setState({ name: e.currentTarget.value });
  }

  setImage() {
    this.setState(preState => {
      return {
        changeImage: !preState.changeImage
      };
    });
  }

  render() {
    return (
      <div className="profile-editor">
        <div className="username-editor">
          <label>
            Username
            <input
              type="text"
              value={this.state.name}
              onChange={this.changeName}
            />
          </label>

          <div onClick={this.props.close} className="close-container">
            <div className="leftright"></div>
            <div className="rightleft"></div>
            <label className="close">close</label>
          </div>
        </div>

        <div className="profile-canvas-container">
          <div className="canvas-editor-container">
            <label>
              Color palette
              <input type="color" onChange={this.changeColor} />
            </label>

            <button onClick={this.clear}>clear picture</button>

            <div id="profile-checkbox">
              <input type="checkbox" onChange={this.setImage} />
              <label>check to confirm picture update</label>
            </div>
          </div>

          <div>
            <label>Draw your profile picture</label>
            <canvas className="profile-picture" ref={this.canvas}></canvas>
          </div>
        </div>

        <div className="update-button">
          <button onClick={this.updateChanges}>UPDATE</button>
        </div>
      </div>
    );
  }
}
