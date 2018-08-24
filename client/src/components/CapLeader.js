import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';

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
      <div className="leader-coin">
        {this.state.data == null ? "Please Wait..." :
        this.state.data.map((coin, idx) => <div>{coin.currency} : {coin.price}</div>)}
      </div>
    );
  }
}

export default CapLeader;
