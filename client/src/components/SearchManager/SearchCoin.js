import React from "react";
import "./SearchManager.css";

const SearchCoin = (props) => {
    const [token, getToken] = React.useState(
        localStorage.getItem("token")
    )

    const addToWatchlist = () => {
        let ticker = props.coin.currency
        let price = props.coin.price

        const settings = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`
                "auth-token": `${token}`
            },
            body: JSON.stringify({
                ticker: ticker,
                price: price
            })
        };

        fetch("/api/add-coin", settings)
            .then((response) => {
                return response.json()
            })
            .catch(err => {
                return err
            })
    }

    const clickHandler = () => {
        addToWatchlist()
        // props.addNew(props.coin)
    }

    let { price } = props.coin;
    let fixedPrice = parseFloat(price).toFixed(2);

    return (
        <li className="coin-result">
            <p> {props.coin.currency} </p>
            <p> {fixedPrice} </p>
            <button
                className="add-to-list"
                onClick={clickHandler}
            >
                + to Watchlist
              </button>
        </li>
    )
}

export default SearchCoin;
