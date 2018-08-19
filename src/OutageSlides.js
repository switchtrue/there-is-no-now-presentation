import React, { Component } from "react";
import { Heading, Slide, Text } from "spectacle";
import List from "spectacle/es/components/list";
import ListItem from "spectacle/es/components/list-item";
import { ServerContext } from "./App";

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
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  start = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/outage/create`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  stop = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/outage/fix`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  render() {
    return (
      <ServerContext.Consumer>
        {server =>
          <Slide transition={["fade"]} bgColor="secondary" textColor="quaternary">
            <div>
              <div className="button-container">
                {server.simulatedOutage
                  ? <button onClick={this.stop}>Fix Outage</button>
                  : <button onClick={this.start}>Create Outage</button>}
              </div>
              <div>
                <Heading size={6} textColor="quaternary" caps>Demo</Heading>
              </div>
            </div>
          </Slide>}
      </ServerContext.Consumer>
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
