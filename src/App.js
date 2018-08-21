import React, { Component } from "react";
import { BlockQuote, Cite, Deck, Heading, ListItem, List, Quote, Slide, Text } from "spectacle";
import io from "socket.io-client";
import ConnectionsStats from "./ConnectionStats";
import createTheme from "spectacle/lib/themes/default";
import { TitleSlide, TitleSlideAppInstructions } from "./TitleSlide";
import TopicsSlide from "./TopicsSlide";
import { NoNowProblemSlide, NoNowDemoSlide, NoNowDemoTwoSlide, NoNowSummarySlide } from "./NoNowSlides";
import { OutageProblemSlide, OutageDemoSlide, OutageSummarySlide } from "./OutageSlides";
import CrosshairIntroSlide from "./CrosshairIntroSlide"
import "normalize.css";
import "./App.css"

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quaternary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export const ServerContext = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      serverState: {},
      connectionStatsVisible: false,
      dataFrequency: 1,
      clockSkew: 0,
    }
  }

  socket = io(`${process.env.REACT_APP_SERVER_URL}/presentation`);

  componentDidMount = () => {
    this.socket.on('connect', function(){});
    this.socket.on('disconnect', function(){});

    this.socket.on('state', (state) => this.setState({serverState: state}));

    this.refreshState();

    setInterval(this.refreshState, 1000);

    this.setDataFrequency(1);
    this.setClockSkew(0);
  };

  refreshState = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/state`)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        this.setState({
          serverState: jsonResponse.data,
        });
      })
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  showConnectionStats = (connectionStatsConfig) => {
    this.setState({
      connectionStatsVisible: true,
      connectionStatsConfig: connectionStatsConfig,
    });
  };

  hideConnectionStats = () => {
    this.setState({
      connectionStatsVisible: false,
      connectionStatsConfig: {
        dataFrequency: false,
        clockSkew: false,
        connectionCount: false,
        requestsPerSecond: false,
      }
    });
  };

  setDataFrequency = (frequency) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/set-data-frequency?frequency=${frequency}`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  setClockSkew = (skew) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/set-clock-skew?skew=${skew}`)
      .catch(err => {
        console.log(`Fetch Error: ${err}`);
      });
  };

  handleDataFrequencyChange = (e) => {
    if (e.target.value && e.target.value > 0) {
      this.setDataFrequency(e.target.value);
    }

    this.setState({
      dataFrequency: e.target.value,
    });
  };

  handleClockSkewChange = (e) => {
    if (e.target.value !== undefined && e.target.value >= 0) {
      this.setClockSkew(e.target.value);
    }

    this.setState({
      clockSkew: e.target.value,
    });
  };

  render() {
    return (
      <ServerContext.Provider value={this.state.serverState}>
        <Deck transition={["fade"]} transitionDuration={500} theme={theme} progress="none">
          <TitleSlide
            hideConnectionStats={this.hideConnectionStats}
            />
          <TitleSlideAppInstructions
            showConnectionStats={() => this.showConnectionStats({dataFrequency: false, clockSkew: false, connectionCount: true, requestsPerSecond: false})}
            />
          <CrosshairIntroSlide
            showConnectionStats={() => this.showConnectionStats({dataFrequency: true, clockSkew: false, connectionCount: true, requestsPerSecond: false})}
            socket={this.socket}
            />
          <TopicsSlide
            hideConnectionStats={this.hideConnectionStats}
            />
          <NoNowProblemSlide
            hideConnectionStats={this.hideConnectionStats}
            />
          <NoNowDemoSlide
            showConnectionStats={() => this.showConnectionStats({dataFrequency: true, clockSkew: true, connectionCount: true, requestsPerSecond: false})}
            />
          <NoNowDemoTwoSlide
            showConnectionStats={() => this.showConnectionStats({dataFrequency: true, clockSkew: true, connectionCount: true, requestsPerSecond: false})}
          />
          <NoNowSummarySlide
            hideConnectionStats={this.hideConnectionStats}
            />
          <OutageProblemSlide
            hideConnectionStats={this.hideConnectionStats}
            />
          <OutageDemoSlide
            showConnectionStats={() => this.showConnectionStats({dataFrequency: true, clockSkew: true, connectionCount: true, requestsPerSecond: false})}
            />
          <OutageSummarySlide
            hideConnectionStats={this.hideConnectionStats}
            />

          <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
            <BlockQuote>
              <Quote>Example Quote</Quote>
              <Cite>Author</Cite>
            </BlockQuote>
          </Slide>
        </Deck>
        {this.state.connectionStatsVisible
          ? <ConnectionsStats
              config={this.state.connectionStatsConfig}
              dataFrequency={this.state.dataFrequency}
              clockSkew={this.state.clockSkew}
              onDataFrequencyChange={this.handleDataFrequencyChange}
              onClockSkewChange={this.handleClockSkewChange}
              />
          : null}
      </ServerContext.Provider>
    );
  }
}

export default App;
