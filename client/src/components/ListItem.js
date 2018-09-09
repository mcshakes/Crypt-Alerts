import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import AlertForm from "./AlertForm";

class ListItem extends React.Component {

  state = {
    coin: this.props.coin,
    price: this.props.price
  }

  render() {
    return (
      <div className="list-item-coin">
        <div >
          <h3>{this.state.coin}</h3>
          <h3>$ {this.state.price} USD</h3>
        </div>

        <div>
          <AlertForm ticker={this.state.coin}/>
        </div>
      </div>
    )
  }
}

export default ListItem;
