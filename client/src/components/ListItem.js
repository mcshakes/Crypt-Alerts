import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import AlertForm from "./AlertForm";
import CurrencyChart from "./CurrencyChart";
import { authService } from "./AuthService"

class ListItem extends React.Component {

  state = {
    coin: this.props.coin,
    price: this.props.price,
    id: this.props.id,
    // sentAlert: this.state.watchdata[0].sentAlert
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

  // setNewAlert = () => {
  //   this.setState(prevState => ({
  //     sentAlert: !prevState.sentAlert
  //   }));
  //   // console.log(this.state.watchdata[0])
  //   // this.state.watchdata[0].sentAlert
  // }

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

  render() {
    const watchData = this.state.watchdata
    const sentAlert = watchData && watchData[0].sentAlert === true

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
        <div >
          <h3>{this.state.coin}</h3>
          <h3>$ {this.state.price} USD</h3>
        </div>

        <div>
          <AlertForm
            ticker={this.state.coin}
            high={this.props.high}
            low={this.props.low}
          />
        </div>
      </div>
    )
  }
}

export default ListItem;
