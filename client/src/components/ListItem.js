import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
const key = process.env.NOMICS_KEY

class ListItem extends React.Component {
  state = {
    coin: this.props.coin
  }
  // coin coming in at props.coin
  // call another API to render all the info

  getCoinData = () => {
    let coin = this.props.coin

    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(coin)
    }

    return fetch(`https://api.nomics.com/v1/candles?key=${key}&interval=1d&currency=${coin}`)
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
