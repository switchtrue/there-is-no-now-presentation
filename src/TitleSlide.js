import React, { Component } from "react";
import { Heading, Slide, Text } from "spectacle";
import AppInstructionsImg from "./app_instructions.png";

const HeadingContent = () => (
  <React.Fragment>
    <Heading size={2} fit caps lineHeight={1} textColor="secondary">
      There is no "now"
    </Heading>
    <Heading size={1} fit caps lineHeight={1} textColor="secondary">
      Sensor data's the worst
    </Heading>
    <Heading size={2} fit caps lineHeight={1} textColor="secondary">
      And other tales...
    </Heading>
  </React.Fragment>
);


const AppInstructionsContent = ({ includeTitle }) => (
  <React.Fragment>
    {includeTitle
      ? <Heading size={3} caps lineHeight={1} textColor="secondary">
          Please join in...
        </Heading>
      : null}
    <br/>
    <img src={AppInstructionsImg} />
  </React.Fragment>
);


export class TitleSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contentType: "title",
    };
  }

  componentDidMount = () => {
    this.contentTypeInterval = setInterval(this.toggleContentType, 10000);
    this.props.hideConnectionStats();
  };

  componentWillUnmount = () => {
    clearInterval(this.contentTypeInterval);
  };

  toggleContentType = () => {
    if (this.state.contentType === 'title') {
      this.setState({contentType: "app-instructions"});
    } else {
      this.setState({contentType: "title"});
    }
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="quaternary">
        <div
          style={{
            transition: "opacity 2s",
            opacity: this.state.contentType === 'title' ? 1 : 0,
            position: "absolute",
            width: "100%",
            top: "-4em",
            left: "-0.9em",
          }}
          >
          <HeadingContent />
        </div>
        <div
          style={{
            transition: "opacity 2s",
            opacity: this.state.contentType === 'app-instructions' ? 1 : 0,
            position: "absolute",
            width: "100%",
            top: "-6em",
            left: "-1em",
          }}
          >
          <AppInstructionsContent includeTitle />
        </div>
      </Slide>
    );
  }
}


export class TitleSlideAppInstructions extends Component {
  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="quaternary">
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "-6em",
            left: "-1em",
          }}
          >
          <AppInstructionsContent />
        </div>
      </Slide>
    );
  }
}