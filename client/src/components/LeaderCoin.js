import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import NumberFormat from 'react-number-format';

class LeaderCoin extends React.Component {
  render() {
    const fPrice = <NumberFormat value={this.props.price} displayType={"text"} thousandSeparator={true} prefix={'$'} decimalScale={2} />

    return (
      <div className="leader-coin">
        {this.props.currency} : {fPrice} USD
      </div>
    );
  }
}

export default LeaderCoin;
