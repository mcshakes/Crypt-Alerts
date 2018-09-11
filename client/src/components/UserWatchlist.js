import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import { authService } from "./AuthService"
import { Link } from 'react-router-dom';
import ListItem from "./ListItem"
import AlertForm from "./AlertForm"

class UserWatchlist extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>These are Cryptos you are watching:</h2>
        <ul className="coin-watchlist">
          {

            this.props.coins.map((coin, idx) => {
              return <ListItem key={idx}
                              coin={coin.ticker || coin.currency}
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
