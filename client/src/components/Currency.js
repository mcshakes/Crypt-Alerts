import React from "react";

class Currency extends React.Component {
  render() {
    return(
      <div className="search-results">
          <li>
            <h3> { this.props.coin.currency }  </h3>
            <button
              className="add-to-list"
              // onClick={this.addToWatchlist}
              >
                + to Watchlist
              </button>
          </li>
      </div>
    )
  }
}

export default Currency;
