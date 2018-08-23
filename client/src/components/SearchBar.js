import React from "react";
import Client from "../Client";
import SearchSuggestions from "./SearchSuggestions"

class SearchBar extends React.Component {
  state = {
    coins: [],
    searchValue: ""
  }

  handleSearchChange = e => {
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
    return (
      <div className="coin-search">
        <form>
          <input
            type="text"
            className="prompt"
            placeholder="BTC...ETH...AEON"
            ref={input => this.search = input}
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
          />
          <SearchSuggestions coins={this.state.coins} />
        </form>


      </div>
    );
  }
}

export default SearchBar;
