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
        props.resetInputField()
        console.log("HEY FROM CHILD")
        setSearchValue("")
    }

    return (
        <div className="search-field">
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

        </div>
    )
}

export default SearchBar;