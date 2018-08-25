import React from "react";
import Client from "../Client";
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
      <div>
        {this.state.data == null ? "Please Wait..." :
        this.state.data.map((coin, idx) => <LeaderCoin currency={coin.currency} price={coin.price}/>)}
      </div>
    );
  }
}

export default CapLeader;
