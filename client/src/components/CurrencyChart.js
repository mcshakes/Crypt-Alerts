import React from "react";
import IOClient from "socket.io-client";

class CurrencyChart extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     data: null,
  //     response: false,
  //     endpoint: "http://127.0.0.1:3001"
  //   };
  // }
  //
  // componentDidMount() {
  //   const { endpoint } = this.state;
  //   const socket = IOClient(endpoint);
  //
  //   socket.on("FromAPI", data => {
  //     this.setState({
  //       data: data
  //     })
  //   })
  // }

  render() {
    return (
      <div>
        I am chart
      </div>
    );
  }
}

export default CurrencyChart;
