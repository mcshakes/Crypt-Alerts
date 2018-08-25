import React from "react";
import Client from "../Client";

class LeaderCoin extends React.Component {
  render() {
    return (
      <div className="leader-coin">
        {this.props.currency} : {this.props.price}
      </div>
    );
  }
}

export default LeaderCoin;
