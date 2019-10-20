import React, { useState } from "react";

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value)
    }

    const resetInputField = () => {
        setSearchValue("")
    }

    const callSearchFunction = (e) => {
        e.preventDefault();
        // call the api with the search value
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