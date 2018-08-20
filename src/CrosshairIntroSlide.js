import React, { Component } from "react";
import { Slide } from "spectacle";
import Crosshair from "./Crosshair";

export default class CrosshairIntroSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gyroData: [],
      crosshairSize: 0,
    };
  }

  componentDidMount = () => {
    this.props.showConnectionStats();
    this.start();
  };

  componentWillUnmount = () => {
    this.stop();
  };

  start = () => {
    this.props.socket.on('gyroData', this.updateGyroData);
  };

  stop = () => {
    this.props.socket.removeListener('gyroData', this.updateGyroData);
  };

  lastUpdate = new Date();

  updateGyroData = (gyroData) => {
    const now = new Date();

    if (now.getTime() - this.lastUpdate.getTime() > 50) {
      this.lastUpdate = now;
      this.setState({
        gyroData: {
          gamma: gyroData.avg.gamma,
          beta: gyroData.avg.beta,
        }
      });
    }
  };

  registerVisualisation = (elem) => {
    this.visualisationElem = elem;
    this.setCrosshairSize(elem);
  };

  setCrosshairSize = (elem) => {
    let size = 0;
    if (elem) {
      size = Math.min(elem.offsetWidth, elem.offsetHeight);
    }
    this.setState({
      crosshairSize: size,
    });
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="tertiary">
        {/*<span style={{color: "white"}}>{this.state.gyroData.gamma}, {this.state.gyroData.beta}</span>*/}
        <div
          style={{
            marginTop: "-4em",
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
          }}
          >
          <div
            ref={this.registerVisualisation}
            className="visualisation"

            >
            <Crosshair
              gamma={this.state.gyroData.gamma} // left-right
              beta={this.state.gyroData.beta} // front-back
              size={this.state.crosshairSize}
              colors={{
                crosshair: "#1F2022",
                ball: "#1F202299",
              }}
              />
          </div>
        </div>

      </Slide>
    );
  }
}