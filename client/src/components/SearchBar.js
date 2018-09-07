import React from "react";
import Client from "../Client";
import '../css/Search.css';
import Currency from "./Currency"

function searchingFor(term) {
    let searchLet = term.split("").slice(0,3).join("")
    return function(x) {
      return x.currency.toLowerCase().includes(searchLet.toLowerCase()) || !term;
    }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: [],
      searchValue: ""
    }
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

  handleAddNew() {
    this.props.addNew(this.state.searchValue)
  }

  render() {
    const {coins, searchValue} = this.state

    return (
      <div className="coin-search">
        <form>
          <input
            type="text"
            className="prompt"
            placeholder="Search by ticker symbol"
            value={searchValue}
            onChange={this.searchHandler}
          />
        </form>
        <ul className="search-suggestions">
          {
            coins.filter(searchingFor(searchValue)).map( coin =>
              <Currency
                coin={coin}
                addNew={this.handleAddNew}
              />
            )
          }
        </ul>
      </div>
    );
  }
}

export default SearchBar;
