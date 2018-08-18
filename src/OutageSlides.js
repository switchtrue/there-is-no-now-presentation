import React, { Component } from "react";
import { Heading, Slide, Text } from "spectacle";
import List from "spectacle/es/components/list";
import ListItem from "spectacle/es/components/list-item";

export class OutageProblemSlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary" textColor="quaternary">
        <Heading size={3} textColor="quaternary" caps>The Problem</Heading>
        <Text size={1} textColor="quaternary">
          During an outage you want to keep data loss to a minimum
        </Text>
      </Slide>
    );
  }
}

export class OutageDemoSlide extends Component {
  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="primary">
        <Heading size={6} textColor="secondary" caps>Demo</Heading>
      </Slide>
    );
  }
}

export class OutageSummarySlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="tertiary">
        <Heading size={3} textColor="primary" caps>Summary</Heading>
        <List size={1}>
          <ListItem>Item One</ListItem>
          <ListItem>Item Two</ListItem>
          <ListItem>Item Three</ListItem>
        </List>
      </Slide>
    );
  }
}
