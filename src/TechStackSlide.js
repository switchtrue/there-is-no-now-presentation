import React, { Component } from "react";
import { Heading, Slide, List, ListItem } from "spectacle";

export default class TechStackSlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="tertiary">
        <Heading size={3} textColor="primary" caps>Presentation Tech</Heading>
        <List size={1}>
          <ListItem>Python backend</ListItem>
          <ListItem>Flask & Flask-SocketIO</ListItem>
          <ListItem>React & Socket.IO</ListItem>
          <ListItem>Weird and wonderful browser API (and hacks!)</ListItem>
        </List>
      </Slide>
    );
  }
}
