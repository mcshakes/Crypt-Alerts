import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import { authService } from "./AuthService"
import { Link } from 'react-router-dom';
import ListItem from "./ListItem"

class UserWatchlist extends React.Component {

  render() {
    return (
      <div>
        <h2>These are Cryptos you are watching:</h2>
        <ul className="coin-watchlist">
          {
            this.props.coins.map((coin, idx) => {
              return <ListItem key={idx}
                              coin={coin.ticker}
                              price={coin.price}
                      />
            })
          }
        </ul>
      </div>
    )
  }
}

export default UserWatchlist;
