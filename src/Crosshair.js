import React, { Component } from "react";
import "./Crosshair.css";

export default class Crosshair extends Component {
  computeTranslates = () => {
    const max_vw = (this.props.size / 2);
    let x, y;
    if (this.props.gamma < 0) {
      x = -((Math.abs(this.props.gamma) / 90) * max_vw);
    } else if (this.props.gamma > 90) {
      x = max_vw;
    } else if (this.props.gamma < -90) {
      x = -max_vw;
    } else {
      x = (Math.abs(this.props.gamma) / 90) * max_vw;
    }

    if (this.props.beta < 0) {
      y = -((Math.abs(this.props.beta) / 90) * max_vw);
    } else if (this.props.beta > 90) {
      y = max_vw;
    } else if (this.props.beta < -90) {
      y = -max_vw;
    } else {
      y = (Math.abs(this.props.beta) / 90) * max_vw;
    }

    return {x, y};
  };

  render() {
    const { x, y } = this.computeTranslates();

    return (
      <div
        className="crosshair"
        style={{
          width: `${this.props.size}px`,
          height: `${this.props.size}px`,
        }}>
        <div
          style={{
            borderColor: (this.props.colors && this.props.colors.crosshair) ? this.props.colors.crosshair : "#6699CC",
          }}
          className="circle" />
        <div
          style={{
            borderColor: (this.props.colors && this.props.colors.crosshair) ? this.props.colors.crosshair : "#6699CC",
          }}
          className="vertical" />
        <div
          style={{
            borderColor: (this.props.colors && this.props.colors.crosshair) ? this.props.colors.crosshair : "#6699CC",
          }}
          className="horizontal" />
        <div
          className="ball"
          style={{
            backgroundColor: (this.props.colors && this.props.colors.ball) ? this.props.colors.ball : "#D93180",
            transform: `translate(${x}px, ${y}px)`,
          }}
          />
      </div>
    );
  }
}