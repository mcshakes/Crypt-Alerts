import React from "react";
import Client from "../Client";

class CapLeader extends React.Component {
  constructor() {

    state = {
      data: null,
    };
  }

  componentDidMount() {
    Client.marketLeaders(coins => {
      this.setState({
        data: coins
      })
    })
  }

  render() {
    return (
      <div className="leader-coin">

      </div>
    );
  }
}

export default CapLeader;
