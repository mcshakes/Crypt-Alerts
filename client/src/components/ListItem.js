import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';

class ListItem extends React.Component {

  state = {
    coin: this.props.coin
  }

  getCoinData = () => {
    let coin = this.state.coin;

    const settings = {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                }
            };

    return fetch(`/api/candles?coin=${coin}`, settings)
  }

  componentDidMount() {
    this.getCoinData()
  }

  render() {
    return (
      <div>
        <div className="leader-coin">
          {this.state.coin}
        </div>
      </div>
    )
  }
}

export default ListItem;
