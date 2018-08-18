import React, { Component } from "react";
import { Heading, Slide, List, ListItem } from "spectacle";

export default class TopicsSlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="tertiary">
        <Heading size={3} textColor="primary" caps>Topics</Heading>
        <List size={1}>
          <ListItem>There is no "now"</ListItem>
          <ListItem>Handling outages</ListItem>
          <ListItem>Processing data</ListItem>
        </List>
      </Slide>
    );
  }
}
