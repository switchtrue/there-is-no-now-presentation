import React, { Component } from "react";
import { ServerContext } from "./App";
import "./ConnectionStats.css";

const ConnectionStat = ({visible, title, value, color, editable, onChange}) => (
  visible
    ? <div className="connection-stat" style={{color: color}}>
        <div>
          {editable
            ? <input
                value={value}
                onChange={onChange}
                style={{color: color}}
                />
            : value}
        </div>
        <div>
          {title}
        </div>
      </div>
    : null
);

export default class ConnectionStats extends Component {
  render() {
    return (
      <ServerContext.Consumer>
        {server =>
          <div className="connection-stats-container">
            <ConnectionStat
              editable
              visible={this.props.config.dataFrequency}
              title="Data interval (secs)"
              value={this.props.dataFrequency}
              color="rgb(153, 138, 247)"
              onChange={this.props.onDataFrequencyChange}
              />
            <ConnectionStat
              editable
              visible={this.props.config.clockSkew}
              title="Clock drift (secs)"
              value={this.props.clockSkew}
              color="rgb(44, 123, 218)"
              onChange={this.props.onClockSkewChange}
              />
            <ConnectionStat
              visible={this.props.config.connectionCount}
              title="Connections"
              value={server.connectionCount}
              color="rgb(75, 167, 216)"
              />
            <ConnectionStat
              visible={this.props.config.requestsPerSecond}
              title="Req. per second"
              value={`${server.requestsPerSecond} (${server.maxRequestsPerSecond})`}
              color="rgb(44, 123, 218)"
              />
          </div>
        }
      </ServerContext.Consumer>
    );
  }
}