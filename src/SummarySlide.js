import React, { Component } from "react";
import { Heading, Slide, List, ListItem } from "spectacle";

export default class SummarySlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="tertiary">
        <Heading size={3} textColor="primary" caps>Summary</Heading>
        <List size={1}>
          <ListItem>Real-time is tricky</ListItem>
          <ListItem>Scale is hard</ListItem>
          <ListItem>Distributed sensors are the worst!</ListItem>
          <ListItem>Consider these problems and solve them</ListItem>
        </List>
      </Slide>
    );
  }
}
