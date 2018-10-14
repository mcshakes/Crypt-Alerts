import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import AlertForm from "./AlertForm";
import SnapshotChart from "./SnapshotChart";
import { authService } from "./AuthService"

class ListItem extends React.Component {

  state = {
    coin: this.props.coin,
    price: this.props.price,
    id: this.props.id,
  }

  componentDidMount() {
    this.getWatchers()
      .then(data => {
        this.setState({
          watchdata: data
        })
      })
  }

  getWatchers = () => {
    let token = authService.getToken();
    let coinID = this.state.id

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        coinID: coinID
      })
    };

  return fetch("/api/watchlist-status", settings)
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
  setNewAlert = () => {
    let token = authService.getToken();
    let coinID = this.state.id

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        coinID: coinID
      })
    };

  return fetch("/api/change-alert-status", settings)
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

// set default prop of empty array

  render() {

    const watchData = this.state.watchdata
    const sentAlert = watchData && watchData[0] && watchData[0].sentAlert === true
// {coin: "DLT", price: "0.06641", id: undefined, watchdata: Array(0)}

    if (sentAlert) {
      return (
        <div className="list-item-coin">
          <div >
            <h3>{this.state.coin}</h3>
            <h3>$ {this.state.price} USD</h3>
          </div>

          <div>
            PRICE ALERT REACHED. LOG IN TO MARKETPLACE
            <div>
              <button
                onClick={this.setNewAlert}
                >
                  Set New Alert
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="list-item-coin">
        <div className="instant-info">
          <h3>{this.state.coin}</h3>
          <h3>$ {this.state.price} USD</h3>
        </div>

        <div>
          <SnapshotChart ticker={this.props.coin}/>
        </div>
      </div>
    )


  }
}

export default ListItem;
