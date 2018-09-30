import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import LeaderCoin from "./LeaderCoin"
import IOClient from "socket.io-client";

class CapLeader extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: false,
      endpoint: "http://127.0.0.1:3001"
    };
  }

  componentWillMount() {
    Client.marketLeaders(coins => {
      this.setState({
        data: coins
      })
    })
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
      <div className="leader-container">
        <aside className="market-cap-leader">
          {this.state.data == null ? "Please Wait..." :
          this.state.data.map((coin, idx) => <LeaderCoin key={idx} currency={coin.currency} price={coin.price}/>)}
        </aside>
      </div>
    );
  }
}

export default CapLeader;
