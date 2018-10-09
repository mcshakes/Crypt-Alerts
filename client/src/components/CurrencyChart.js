import React from "react";
import IOClient from "socket.io-client";
import { VictoryLine } from "victory";
import LineChart from "./LineChart";

class CurrencyChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: false,
      endpoint: `/charts-io`
      // endpoint: `/charts-io/${this.props.ticker}`
    };
  }

  componentDidMount() {
    const ticker = this.props.ticker
    const { endpoint } = this.state;

    const connect = function(namespace) {
      return IOClient(namespace, {
        query: "namespace=" + ticker,
        resource: "socket.io"
      });
    }

    const socket = connect(endpoint);

    socket.on("FromAPI", data => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    return (
      <div>
        <LineChart
          data={this.state.data}
          />
      </div>
    );
  }
}

export default CurrencyChart;
