import React from "react";
import Client from "../Client";
import SearchSuggestions from "./SearchSuggestions"

function searchingFor(term) {
  return function(x) {
    x.currency.toLowerCase().includes(term.toLowerCase()) || !term;
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
            // ref={input => this.search = input}
            value={this.state.searchValue}
            onChange={this.searchHandler}
          />
          {/* <SearchSuggestions coins={this.state.coins} /> */}
        </form>
        {
          coins.filter(searchingFor(searchValue))
        }

      </div>
    );
  }
}

export default SearchBar;
