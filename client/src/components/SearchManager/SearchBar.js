import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import { SearchContext } from "./SearchManager";

const SearchBar = forwardRef((props, ref) => {

    const [searchValue, setSearchValue] = useState("")

    const handleSearchInputChanges = (e) => {
        const { value } = e.target;
        props.trimSearchResponse(value);
        setSearchValue(value)
    }

    useImperativeHandle(ref, () => {
        return {
            resetField: resetField
        }
    })

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
});

export default SearchBar;