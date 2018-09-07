import React from "react";
import { authService } from "./AuthService";

class Currency extends React.Component {

  addToWatchlist = () => {
    let ticker = this.props.coin.currency
    let price = this.props.coin.price
    let token = authService.getToken();

    // console.log(this.props)
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        ticker: ticker,
        price: price
      })
    };

    fetch("/api/add-coin", settings)
      .then((response) => {
        return response.json()
      })
      .catch(err => {
        return err
      })
  }

  clickHandler = () => {
    this.addToWatchlist()
    // this.props.addNew(this.props.coin)
    this.props.addNew(this.props.coin)
  }

  render() {
    return(
      <div className="search-results">
          <li>
            <h3> { this.props.coin.currency } </h3>
            <button
              className="add-to-list"
              onClick={this.clickHandler}
              >
                + to Watchlist
              </button>
          </li>
      </div>
    )
  }
}

export default Currency;
