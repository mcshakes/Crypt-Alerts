import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchCoin from "./SearchCoin";
import axios from "axios";
import "./SearchManager.css";


class SearchManager extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            searchQuery: "",
            loading: false,
            coins: []
        }
    }

    componentDidMount() {
        this.loadSearchCoins()
    }

    loadSearchCoins = () => {
        axios.get("/api/search")
            .then(response => {
                return response.data
            })
            .then(jsonRes => {
                this.setState({
                    coins: jsonRes
                })
            })
    }

    searchHandler = query => {
        this.setState({ searchQuery: query })

    }

    trimCoinGrid = (term) => {
        if (!term) return () => false;

        let searchLet = term.split("").slice(0, 3).join("")
        return function (x) {
            return x.currency.toLowerCase().includes(searchLet.toLowerCase()) || !term;
        }
    }


    filterCoins = (coins, searchQuery) => {
        return coins.filter(this.trimCoinGrid(searchQuery)).map(coin =>
            < SearchCoin
                key={coin.currency}
                coin={coin}
            />
        )

    }

    render() {
        const { coins, searchQuery } = this.state;
        let searchContent;

        if (searchQuery) {
            searchContent = this.filterCoins(coins, searchQuery)
        } else {
            searchContent = <p>waiting...</p>
        }
        return (
            <div className="search-container">
                <SearchBar trimSearchResponse={this.searchHandler} />
                <ul className="search-results">
                    {searchContent}
                </ul>
            </div>
        )
    }
}

export default SearchManager;

