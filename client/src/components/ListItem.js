import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';

class ListItem extends React.Component {

  state = {
    coin: this.props.coin,
    data: [],
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
      .then((response) => {
        return response.json()
      })
      .then(data => {
        return data
      })
      .catch(err => {
        return err
      })
  }

  componentDidMount() {
    this.getCoinData()
      .then(data => {
        this.setState({
          data: data
        })
      })
  }

  render() {
    return (
      <div className="leader-coin">
        <div >
          <h3>{this.state.coin}</h3>
        </div>
        <div className="volume-data">
            <p>Market Open:{this.state.data.open} USD</p>
            <p>Market Close: {this.state.data.close} USD</p>
            <p>High: {this.state.data.high} USD</p>
            <p>Low: {this.state.data.low} USD</p>
            <p>Volume: {this.state.data.low}</p>
        </div>
      </div>
    )
  }
}

export default ListItem;
