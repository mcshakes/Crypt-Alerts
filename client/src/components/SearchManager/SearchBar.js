import React, { useState } from "react";
import axios from "axios";

const SearchBar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
        callSearchFunction(searchValue)
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (value) => {
        props.trimCoinsResponse(value)
    }

    return (
        <div className="search-params">
            <form>
                <label htmlFor="cryptocurrency">
                    Cryptocurrency
                <input
                        id="cryptocurrency"
                        placeholder="search by ticker"
                        value={searchValue}
                        onChange={handleSearchInputChanges}
                    />
                </label>
            </form>
        </div>
    )
}

export default SearchBar;