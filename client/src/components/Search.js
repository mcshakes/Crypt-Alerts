import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

import axios from "axios";

const API_URL = "/api/search"

const Search = () => {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


    useEffect(() => {
        loadSearchCoins();

        setLoading(false);
    }, [])

    const loadSearchCoins = () => {
        axios.get(API_URL)
            .then(response => {
                return response.data
            })
            .then(jsonRes => {
                setCoins(jsonRes)
            })
    }

    return (
        <div className="search-box">
            <SearchBar />
        </div>
    )
}

export default Search;