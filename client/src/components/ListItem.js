import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';

class ListItem extends React.Component {

  state = {
    coin: this.props.coin,
    price: this.props.price
  }

  render() {
    return (
      <div className="leader-coin">
        <div >
          <h3>{this.state.coin}</h3>
          <h3>{this.state.price}</h3>
        </div>
      </div>
    )
  }
}

export default ListItem;
