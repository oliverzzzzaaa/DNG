import React from "react";
import "./colorPicker.css";

export default class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.selectColor = this.selectColor.bind(this);
    this.rgbToHex = this.rgbToHex.bind(this);
    this.state = {
      color: "#000000",
      showColorPile: false
    };
  }

  selectColor(e) {
    const colorHexStr = this.rgbToHex(e.currentTarget.style.backgroundColor);
    this.setState({ color: colorHexStr });
    if (this.props.selectColor) {
      this.props.selectColor(colorHexStr);
    }
  }

  rgbToHex(rbg) {
    const rbgValues = rbg.match(/\d+/g);
    return (
      "#" +
      rbgValues
        .map(v => {
          let hex = Number(v).toString(16);
          if (hex.length < 2) {
            hex = "0" + hex;
          }
          return hex;
        })
        .join("")
    );
  }

  render() {
    return (
      <div id="color-picker">
        <div
          onClick={() => {
            this.setState(prevState => ({
              showColorPile: !prevState.showColorPile
            }));
          }}
          className="selected-color canvas-bottom-button"
          style={{ background: this.state.color }}
        >color</div>
        <div className="color-pile">
          <tbody className={`table ${this.state.showColorPile ? "" : "hide"}`}>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#330000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#331900" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#333300" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#193300" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#003300" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#003319" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#003333" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#001933" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#000033" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#190033" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#330033" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#330019" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#000000" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#660000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#663300" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#666600" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#336600" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#006600" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#006633" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#006666" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#003366" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#000066" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#330066" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#660066" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#660033" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#202020" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#990000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#994C00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#999900" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#4C9900" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#009900" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00994C" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#009999" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#004C99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#000099" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#4C0099" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#990099" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99004C" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#404040" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CC0000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CC6600" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCCC00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#66CC00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00CC00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00CC66" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00CCCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#0066CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#0000CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#6600CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CC00CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CC0066" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#606060" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF0000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF8000" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFF00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#80FF00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00FF00" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00FF80" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#00FFFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#0080FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#0000FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#7F00FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF00FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF007F" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#808080" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF3333" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF9933" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFF33" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99FF33" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#33FF33" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#33FF99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#33FFFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#3399FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#3333FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#9933FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF33FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF3399" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#A0A0A0" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF6666" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFB266" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFF66" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#B2FF66" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#66FF66" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#66FFB2" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#66FFFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#66B2FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#6666FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#B266FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF66FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF66B2" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#C0C0C0" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF9999" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFCC99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFF99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCFF99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99FF99" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99FFCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99FFFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#99CCFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#9999FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CC99FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF99FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FF99CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#E0E0E0" }}
              >
                &nbsp;
              </td>
            </tr>
            <tr>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFCCCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFE5CC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFFCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#E5FFCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCFFCC" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCFFE5" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCFFFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCE5FF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#CCCCFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#E5CCFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFCCFF" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFCCE5" }}
              >
                &nbsp;
              </td>
              <td
                className="td"
                onClick={this.selectColor}
                style={{ background: "#FFFFFF" }}
              >
                &nbsp;
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    );
  }
}
