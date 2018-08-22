import React, { Component } from "react";
import { Heading, Slide, Text, List, ListItem } from "spectacle";
import { VictoryChart, VictoryArea, VictoryScatter, VictoryTheme, VictoryBar } from "victory";
import NoNowOne from "./no_now_1.png";
import NoNowTwo from "./no_now_2.png";
import NoNowThree from "./no_now_3.png";

export class NoNowProblemSlide extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary" textColor="quaternary">
        <Heading size={3} textColor="quaternary" caps>Problem One</Heading>
        <Text size={1} textColor="quaternary">
          You want to view real-time data as it comes in
        </Text>
      </Slide>
    );
  }
}

export class NoNowDemoSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'stopped',
      gyroData: [],
      marks: [],
    }
  }

  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  componentWillUnmount = () => {
    this.stop();
  };

  start = () => {
    this.latestInterval = setInterval(this.fetchGyroDataLatest, 1000);
    this.setState({
      status: 'running',
    });
  };

  stop = () => {
    clearInterval(this.latestInterval);
    this.setState({
      status: 'stopped',
    });
  };

  resetGyroData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/reset`)
      .then(response => {
        this.setState({
          gyroData: [],
          marks:[]
        });
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  fetchGyroDataLatest = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/latest`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let nextGyroData = this.state.gyroData;
        nextGyroData.push({
          x: new Date(),
          y: jsonResponse.data.avg.beta,
        });

        this.setState({gyroData: nextGyroData});
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  mark = () => {
    let nextMarks = this.state.marks;
    nextMarks.push({
      x: new Date(),
      y: 0,
    });

    this.setState({marks: nextMarks});
  };

  registerGraph = (graphContainer) => {
    if (graphContainer) {
      this.setState({
        graphWidth: graphContainer.clientWidth,
        graphHeight: graphContainer.clientHeight,
      });
    }
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-2em",
        }}>
          <div className="button-container">
            {this.state.status === 'stopped'
              ? <button onClick={this.start}>Start</button>
              : <button onClick={this.stop}>Stop</button>}
            <button onClick={this.resetGyroData}>Reset</button>
            <button onClick={this.mark}>Mark</button>
          </div>
          <div
            ref={this.registerGraph}
            style={{height: "80vh", width: "90vw"}}
            >
            {this.state.graphWidth && this.state.graphHeight
              ? <VictoryChart
                  theme={{
                    ...VictoryTheme.material,
                    axis: {
                      ...VictoryTheme.material.axis,
                      style: {
                        ...VictoryTheme.material.axis.style,
                        tickLabels: {
                          ...VictoryTheme.material.axis.tickLabels,
                          fontSize: 24,
                          fill: "#fff"
                        },
                        grid: {
                          ...VictoryTheme.material.axis.grid,
                          stroke: "#777777",
                          strokeDasharray: "10, 5",
                        }
                      }
                    },
                  }}
                  scale={{ x: "time" }}
                  height={this.state.graphHeight}
                  width={this.state.graphWidth}
                  domain={{y: [-90, 90]}}
                  >
                  <VictoryArea
                    style={{ data: { stroke: "#03A9FC", strokeWidth: 2, fill: "#03A9FC66" } }}
                    data={this.state.gyroData}
                    />
                  <VictoryScatter
                    style={{ data: { fill: "#FFFFFF66" } }}
                    size={8}
                    data={this.state.gyroData}
                    />
                  {this.state.marks.length > 0
                    ? <VictoryScatter
                        style={{ data: { fill: "#c43a31" } }}
                        size={10}
                        data={this.state.marks}
                        />
                    : null}
                </VictoryChart>
              : null}
          </div>
        </div>


        {/*<Heading size={6} textColor="secondary" caps>Demo</Heading>*/}
      </Slide>
    );
  }
}

export class NoNowDemoTwoSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'stopped',
      gyroData: [],
      marks: [],
    }
  }

  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  componentWillUnmount = () => {
    this.stop();
  };

  start = () => {
    this.latestInterval = setInterval(this.fetchGyroDataLatest, 500);
    this.setState({
      status: 'running',
    });
  };

  stop = () => {
    clearInterval(this.latestInterval);
    this.setState({
      status: 'stopped',
    });
  };

  resetGyroData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/reset`)
      .then(response => {
        this.setState({
          gyroData: [],
          marks:[]
        });
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  fetchGyroDataLatest = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/latest`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let nextGyroData = [];

        for (let ts in jsonResponse.data.fivesec) {
          if (jsonResponse.data.fivesec.hasOwnProperty(ts)) {
            const data = jsonResponse.data.fivesec[ts];
            nextGyroData.push({
              x: new Date(ts * 1000),
              y: data.beta,
            });
          }
        }

        this.setState({gyroData: nextGyroData});
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  // mark = () => {
  //   let nextMarks = this.state.marks;
  //   nextMarks.push({
  //     x: new Date(),
  //     y: 0,
  //   });
  //
  //   this.setState({marks: nextMarks});
  // };

  registerGraph = (graphContainer) => {
    if (graphContainer) {
      this.setState({
        graphWidth: graphContainer.clientWidth,
        graphHeight: graphContainer.clientHeight,
      });
    }
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-2em",
        }}>
          <div className="button-container">
            {this.state.status === 'stopped'
              ? <button onClick={this.start}>Start</button>
              : <button onClick={this.stop}>Stop</button>}
            <button onClick={this.resetGyroData}>Reset</button>
            {/*<button onClick={this.mark}>Mark</button>*/}
          </div>
          <div
            ref={this.registerGraph}
            style={{height: "80vh", width: "90vw"}}
          >
            {this.state.graphWidth && this.state.graphHeight
              ? <VictoryChart
                theme={{
                  ...VictoryTheme.material,
                  axis: {
                    ...VictoryTheme.material.axis,
                    style: {
                      ...VictoryTheme.material.axis.style,
                      tickLabels: {
                        ...VictoryTheme.material.axis.tickLabels,
                        fontSize: 24,
                        fill: "#fff"
                      },
                      grid: {
                        ...VictoryTheme.material.axis.grid,
                        stroke: "#777777",
                        strokeDasharray: "10, 5",
                      }
                    }
                  },
                }}
                scale={{ x: "time" }}
                height={this.state.graphHeight}
                width={this.state.graphWidth}
                domain={{y: [-90, 90]}}
              >
                <VictoryBar
                  style={{ data: { stroke: "#03A9FC", strokeWidth: 2, fill: "#03A9FC66" } }}
                  data={this.state.gyroData}
                />

              </VictoryChart>
              : null}
          </div>
        </div>


        {/*<Heading size={6} textColor="secondary" caps>Demo</Heading>*/}
      </Slide>
    );
  }
}

export class NoNowSolutionOne extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "-6em",
            left: "-1em",
          }}
        >
          <img src={NoNowOne} height="500" />
        </div>
      </Slide>
    );
  }
}

export class NoNowSolutionTwo extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "-6em",
            left: "-1em",
          }}
        >
          <img src={NoNowTwo} height="500" />
        </div>
      </Slide>
    );
  }
}

export class NoNowSolutionThree extends Component {
  componentDidMount = () => {
    this.props.hideConnectionStats();
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div
          style={{
            position: "absolute",
            width: "100%",
            top: "-6em",
            left: "-1em",
          }}
        >
          <img src={NoNowThree} height="500" />
        </div>
      </Slide>
    );
  }
}

export class NoNowDemoThreeSlide extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'stopped',
      gyroData: [],
      marks: [],
    }
  }

  componentDidMount = () => {
    this.props.showConnectionStats();
  };

  componentWillUnmount = () => {
    this.stop();
  };

  start = () => {
    this.latestInterval = setInterval(this.fetchGyroDataLatest, 500);
    this.setState({
      status: 'running',
    });
  };

  stop = () => {
    clearInterval(this.latestInterval);
    this.setState({
      status: 'stopped',
    });
  };

  resetGyroData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/reset`)
      .then(response => {
        this.setState({
          gyroData: [],
          marks:[]
        });
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  fetchGyroDataLatest = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/gyro/data/latest`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        let nextGyroData = [];

        for (let ts in jsonResponse.data.fivesecDelayed) {
          if (jsonResponse.data.fivesecDelayed.hasOwnProperty(ts)) {
            const data = jsonResponse.data.fivesecDelayed[ts];
            nextGyroData.push({
              x: new Date(ts * 1000),
              y: data.beta,
            });
          }
        }

        this.setState({gyroData: nextGyroData});
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  // mark = () => {
  //   let nextMarks = this.state.marks;
  //   nextMarks.push({
  //     x: new Date(),
  //     y: 0,
  //   });
  //
  //   this.setState({marks: nextMarks});
  // };

  registerGraph = (graphContainer) => {
    if (graphContainer) {
      this.setState({
        graphWidth: graphContainer.clientWidth,
        graphHeight: graphContainer.clientHeight,
      });
    }
  };

  render() {
    return (
      <Slide transition={["fade"]} bgColor="secondary">
        <div style={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-2em",
        }}>
          <div className="button-container">
            {this.state.status === 'stopped'
              ? <button onClick={this.start}>Start</button>
              : <button onClick={this.stop}>Stop</button>}
            <button onClick={this.resetGyroData}>Reset</button>
            {/*<button onClick={this.mark}>Mark</button>*/}
          </div>
          <div
            ref={this.registerGraph}
            style={{height: "80vh", width: "90vw"}}
          >
            {this.state.graphWidth && this.state.graphHeight
              ? <VictoryChart
                theme={{
                  ...VictoryTheme.material,
                  axis: {
                    ...VictoryTheme.material.axis,
                    style: {
                      ...VictoryTheme.material.axis.style,
                      tickLabels: {
                        ...VictoryTheme.material.axis.tickLabels,
                        fontSize: 24,
                        fill: "#fff"
                      },
                      grid: {
                        ...VictoryTheme.material.axis.grid,
                        stroke: "#777777",
                        strokeDasharray: "10, 5",
                      }
                    }
                  },
                }}
                scale={{ x: "time" }}
                height={this.state.graphHeight}
                width={this.state.graphWidth}
                domain={{y: [-90, 90]}}
              >
                <VictoryBar
                  style={{ data: { stroke: "#03A9FC", strokeWidth: 2, fill: "#03A9FC66" } }}
                  data={this.state.gyroData}
                />

              </VictoryChart>
              : null}
          </div>
        </div>


        {/*<Heading size={6} textColor="secondary" caps>Demo</Heading>*/}
      </Slide>
    );
  }
}

export class NoNowSummarySlide extends Component {
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
