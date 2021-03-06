import React, { Component } from "react";
import { Heading, Slide, Text } from "spectacle";
import List from "spectacle/es/components/list";
import ListItem from "spectacle/es/components/list-item";
import { ServerContext } from "./App";
import Timer from "./Timer";

export class OutageProblemSlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary" textColor="quaternary">
        <Heading size={3} textColor="quaternary" caps>Problem Two</Heading>
        <Text size={1} textColor="quaternary">
          During an outage you want to keep data loss to a minimum
        </Text>
      </Slide>
    );
  }
}

// export class OutageProblemTwoSlide extends Component {
//   componentDidMount = () => {
//     this.props.hideConnectionStats();
//   };
//
//   render() {
//     return (
//       <Slide transition={["none"]} bgColor="secondary" textColor="quaternary">
//         <Heading size={3} textColor="quaternary" caps>Problem Two</Heading>
//         <Text size={1} textColor="quaternary">
//           During an outage you want to keep data loss to a minimum
//         </Text>
//         <Text transition={['fade']} size={1} textColor="quaternary">
//           ...But don't DDoS yourself
//         </Text>
//       </Slide>
//     );
//   }
// }

export class OutageDemoSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strategy: "immediate",
    }
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

  resetMaxRequests = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/reset/max-requests`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  handleOnStrategyChange = (e) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/outage/strategy?strategy=${e.target.value}`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
    this.setState({
      strategy: e.target.value,
    });
  };

  render() {
    return (
      <ServerContext.Consumer>
        {server =>
          <Slide transition={["fade"]} bgColor="secondary" textColor="quaternary">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "-3em"
            }}>
              <div className="button-container" style={{width: "7em"}}>
                {server.simulatedOutage
                  ? <button onClick={this.stop}>Fix Outage</button>
                  : <button onClick={this.start}>Create Outage</button>}
                <button onClick={this.resetMaxRequests}>Reset</button>
                <Text
                  style={{
                    marginTop: "1em",
                    width: "6em",
                  }}
                  textColor="quaternary"
                  >
                  <Timer run={server.simulatedOutage} />
                </Text>
              </div>
              <div>
                <div style={{
                  marginBottom: "2em"
                }}>
                  <Heading size={4} textColor="quaternary">
                    {server.requestsPerSecond}
                  </Heading>
                  <Heading size={6} textColor="tertiary">
                    Requests per Second
                  </Heading>
                </div>
                <div>
                  <Heading size={4} textColor="quaternary">
                    {server.maxRequestsPerSecond}
                  </Heading>
                  <Heading size={6} textColor="tertiary">
                    Max. Requests per Second
                  </Heading>
                </div>
                <div
                  style={{
                    marginTop: "2em",
                    color: "#888",
                  }}>
                  Strategy:
                  <select
                    style={{
                      backgroundColor: "transparent",
                      color: "#888",
                      border: "none",
                      outline: "none",
                    }}
                    onChange={this.handleOnStrategyChange}
                    value={this.state.strategy}
                    >
                    <option value="immediate">Immediate</option>
                    <option value="exponential-backoff" selected="selected">Exponential Back-Off</option>
                  </select>
                </div>
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
