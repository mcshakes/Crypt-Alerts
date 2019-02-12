import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import LeaderCoin from "./LeaderCoin"
import IOClient from "socket.io-client";
import Puff from "../assets/puff.svg";

class CapLeader extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      response: false,
      // endpoint: process.env.NODE_ENV === 'production' ? '/capleader' : "http://127.0.0.1:3001/capleader"
      endpoint: '/capleader'
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
    let wait = <div>
                <p id="wait-message">Loading...</p>
                <img src={Puff} />
              </div>

    return (
      <div className="leader-container">
        <aside className="market-cap-leader">
          {this.state.data == null ? wait :
          this.state.data.map((coin, idx) => <LeaderCoin key={idx} currency={coin.currency} price={coin.price}/>)}
        </aside>
      </div>
    );
  }
}

export default CapLeader;
