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
    const coins = this.props.coins.map(coin => {
      if( typeof coin.isNew !== "undefined") return coin;

      if (typeof coin === "object") {
        coin._doc = coin;
      }
      return coin;
    })


    return (
      <div>
        <h2>Cryptos you are Watching:</h2>
        <ul className="coin-watchlist">
          {

            this.props.coins.map((coin, idx) => {
              return <ListItem key={idx}
                              coin={ coin._doc && (coin._doc.ticker || coin._doc.currency) }
                              price={ coin._doc && coin._doc.price}
                              id={ coin._doc && coin._doc._id}
                              high={coin.high}
                              low={coin.low}
                      />
            })
          }
        </ul>
      </div>
    )
  }
}

export default UserWatchlist;
