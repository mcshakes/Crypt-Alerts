import React from "react";
import IOClient from "socket.io-client";

class CurrencyChart extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: false,
      endpoint: "/charts-io"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = IOClient(endpoint);

    socket.on("FromAPI", data => {
      this.setState({
        data: data
      })
    })
  }

  render() {
    return (
      <div>
        I am chart
      </div>
    );
  }
}

export default CurrencyChart;
