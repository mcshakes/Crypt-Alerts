import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import LeaderCoin from "./LeaderCoin"

class CapLeader extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    Client.marketLeaders(coins => {
      this.setState({
        data: coins
      })
    })
  }

  render() {
    return (
      <div className="market-cap-leader">
        {this.state.data == null ? "Please Wait..." :
        this.state.data.map((coin, idx) => <LeaderCoin key={idx} currency={coin.currency} price={coin.price}/>)}
      </div>
    );
  }
}

export default CapLeader;
