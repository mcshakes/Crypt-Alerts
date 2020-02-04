import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchCoinList from "./SearchCoinList";

import axios from "axios";

const SearchContext = React.createContext("");

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

    handleFuzzySearch = fuzzyValue => {
        this.setState({
            searchQuery: fuzzyValue
        })
    }

    render() {
        const { coins } = this.state;
        const { searchQuery } = this.state;
        let searchContent;

        if (searchQuery) {
            searchContent = (
                <div className="query-result">
                    <SearchCoinList coins={coins} />
                </div>
            )
        }
        return (
            <div className="search-box">
                <SearchContext.Provider>
                    <SearchBar trimCoinsResponse={this.handleFuzzySearch} />
                    {searchContent}
                </SearchContext.Provider>
            </div>
        )
    }
}

export default SearchManager;