import React, { useState } from "react";
import axios from "axios";

const SearchBar = (props) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault();

        // pass searchValue up the prop function

        //reset the input field
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