import React, { useState } from "react";
import axios from "axios";
import { SearchContext } from "./SearchManager";

const SearchBar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
        props.trimSearchResponse(e.target.value)
    }

    const resetInputField = () => {
        setSearchValue("")
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