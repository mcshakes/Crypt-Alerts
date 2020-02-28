import React, { useState, useEffect } from "react";
import axios from "axios";
import { SearchContext } from "./SearchManager";

const SearchBar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        const { value } = e.target;
        props.trimSearchResponse(value);
        setSearchValue(value)
    }

    const poopFunction = () => {
        props.poopFunction()
    }

    const resetField = () => setSearchValue("")

    return (

        < div className="search-field" >
            <form>
                <input
                    id="cryptocurrency"
                    placeholder="search by ticker"
                    value={searchValue}
                    onChange={handleSearchInputChanges}
                />
                <label htmlFor="cryptocurrency">
                </label>
            </form>

        </div >
    )
}

export default SearchBar;