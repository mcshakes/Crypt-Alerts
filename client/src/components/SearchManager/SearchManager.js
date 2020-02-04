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

    trimCoinGrid = (thing) => {
        console.log(thing)
    }

    render() {
        const { coins } = this.state;
        const { searchQuery } = this.state;
        let searchContent;

        if (searchQuery) {
            searchContent = (
                <div className="query-result">
                    <SearchCoinGrid coins={coins} />
                </div>
            )
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
