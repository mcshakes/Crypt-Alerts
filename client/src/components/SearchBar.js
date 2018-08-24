import React from "react";
import Client from "../Client";
import SearchSuggestions from "./SearchSuggestions"

function searchingFor(term) {
    let searchLet = term.split("")
  // console.log(searchLet)
    return function(x) {
      return x.currency.toLowerCase().includes(searchLet.toLowerCase()) || !term;
    }
}

class SearchBar extends React.Component {
  state = {
    coins: [],
    searchValue: ""
  }

  searchHandler = e => {
    e.preventDefault()
    const value = e.target.value

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        coins: []
      })
    } else {
      this.getInfo()
    }
  }

  getInfo = () => {
    Client.searchList()
    .then((data) => {
      this.setState({
        coins: data
      })
    })
  }

  render() {
    const {coins, searchValue} = this.state

    return (
      <div className="coin-search">
        <form>
          <input
            type="text"
            className="prompt"
            placeholder="BTC...ETH...AEON"
            value={searchValue}
            onChange={this.searchHandler}
          />
        </form>
        {
          coins.filter(searchingFor(searchValue)).map( coin =>
            <div>
              <h2> { coin.currency } </h2>
            </div>
          )
        }

      </div>
    );
  }
}

export default SearchBar;
