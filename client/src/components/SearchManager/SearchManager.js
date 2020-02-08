import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import SearchCoinGrid from "./SearchCoinGrid";
import axios from "axios";

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

    trimCoinGrid = (term) => {
        if (!term) return () => false;
        if (term) {
            this.setState({ searchQuery: term })
        }

        let searchLet = term.split("").slice(0, 3).join("")
        return function (x) {
            return x.currency.toLowerCase().includes(searchLet.toLowerCase()) || !term;
        }
    }

    filterCoins = (searchQuery) => {
        this.state.coins.filter(this.trimCoinGrid(searchQuery)).map(
            coin => <SearchCoinGrid coins={coin} />
        )
    }

    render() {
        const { coins } = this.state;
        const { searchQuery } = this.state;
        let searchContent;

        if (searchQuery) {
            searchContent = this.filterCoins(searchQuery)
        } else {
            searchContent = <p>waiting...</p>
        }
        return (
            <div className="search-box">
                <SearchBar trimSearchResponse={this.trimCoinGrid} />
                {searchContent}
            </div>
        )
    }
}

export default SearchManager;

