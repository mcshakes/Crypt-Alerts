import React from "react";

class SearchBar extends React.Component {
  state = {
    coins: [],
    searchValue: ""
  }

  handleSearchChange = e => {
    e.preventDefault()

    this.setState({
      searchValue: this.search.value
    })
  }

  render() {
    return (
      <div className="coin-search">
        <form>
          <input
            type="text"
            className="prompt"
            value={this.state.handleSearchChange}
          />
        </form>

      </div>
    );
  }
}

export default SearchBar;
