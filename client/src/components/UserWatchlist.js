import React from "react";
import '../css/UserWatchlist.css';
import ListItem from "./ListItem"

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
        <h2>You are Watching These Currencies</h2>
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
