import React from "react";
import "./SearchManager.css";

const SearchCoin = (props) => {
    const [token, getToken] = React.useState(
        localStorage.getItem("token")
    )

    const addToWatchlist = () => {
        let ticker = props.coin.currency
        let price = props.coin.price

        console.log(token)
        // const settings = {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`
        //     },
        //     body: JSON.stringify({
        //         ticker: ticker,
        //         price: price
        //     })
        // };

        // fetch("/api/add-coin", settings)
        //     .then((response) => {
        //         return response.json()
        //     })
        //     .catch(err => {
        //         return err
        //     })
    }

    const clickHandler = () => {
        addToWatchlist()
        // this.props.addNew(this.props.coin)
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

// class SearchCoin extends React.Component {
//     [token, getToken] = React.useState()

//     addToWatchlist = () => {
//         let ticker = this.props.coin.currency
//         let price = this.props.coin.price

//         const settings = {
//             method: "POST",
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//                 // "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 ticker: ticker,
//                 price: price
//             })
//         };

//         fetch("/api/add-coin", settings)
//             .then((response) => {
//                 return response.json()
//             })
//             .catch(err => {
//                 return err
//             })
//     }

//     clickHandler = () => {
//         // this.addToWatchlist()
//         // this.props.addNew(this.props.coin)
//     }

//     render() {
//         let { price } = this.props.coin;
//         let fixedPrice = parseFloat(price).toFixed(2);

//         return (
//             <li className="coin-result">
//                 <p> {this.props.coin.currency} </p>
//                 <p> {fixedPrice} </p>
//                 <button
//                     className="add-to-list"
//                     onClick={this.clickHandler}
//                 >
//                     + to Watchlist
//               </button>
//             </li>
//         )
//     }
// }

export default SearchCoin;
