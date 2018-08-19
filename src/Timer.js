import React, { Component } from "react";

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startDate: null,
      elapsed: 0,
    };
  }

  componentDidMount = () => {
    if (this.props.run) {
      this.resetAndStartTimer();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    // start timer
    if (!this.props.run && nextProps.run) {
      this.resetAndStartTimer();
    }

    if (this.props.run && !nextProps.run) {
      this.pauseTimer();
    }
  };

  resetAndStartTimer = () => {
    this.setState({
      startDate: new Date(),
      elapsed: 0,
    });

    this.timerInterval = setInterval(this.updateTime, 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timerInterval);
  };

  updateTime = () => {
    const now = new Date();
    const elapsed = Math.round((now.getTime() - this.state.startDate.getTime()) / 1000);

    this.setState({
      elapsed: elapsed,
    });
  };

  render() {
    return (
      <div>
        {this.state.elapsed} seconds
      </div>
    );
  }
}