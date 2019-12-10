import React from "react";
import "./Home.css";
import IOClient from "socket.io-client";
import CoinItem from "../../components/MarketLeaders/CoinItem";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoading: false,
            ioEndpoint: "/capleader"
        }
    }

    componentDidMount() {
        this.fetchAllMarketLeaders()
    }

    fetchAllMarketLeaders = () => {
        this.setState({ isLoading: true })

        const { ioEndpoint } = this.state;
        const socket = IOClient(ioEndpoint);

        socket.on("FromAPI", data => {
            this.setState({
                data: data,
            })
        })
    }

    renderTableHeader() {
        let header = ["Symbol", "Name", "Price", "Market Cap", "24H Change", "7d Change ", "30d Change", "1Year Change", "All Time High"]

        return header.map((key, idx) => {
            return <th key={idx} className="table-headers">{key}</th>
        })
    }

    checkPriceLoss = (price) => {
        let priceElems = price.split("");
        if (priceElems[0] === "-") {
            return true
        }
    }

    renderTableData = () => {
        return this.state.data.map((coin, idx) => {

            const { id, symbol, name, price, market_cap, high } = coin
            const OneDayChange = parseFloat(coin["1d"].price_change_pct).toFixed(2);
            const SevenDayChange = parseFloat(coin["7d"].price_change_pct).toFixed(2);
            const ThirtyDayChange = parseFloat(coin["30d"].price_change_pct).toFixed(2);
            const YearChange = parseFloat(coin.ytd.price_change_pct).toFixed(2);
            const priceDollar = parseFloat(price).toFixed(2);
            const allTimeHigh = parseFloat(high).toFixed(2);

            const priceStyling = (price) => {
                let base = "price-color-";
                if (this.checkPriceLoss(price)) base += "loss";
                if (!this.checkPriceLoss(price)) base += "gain"
                return base;
            }

            return (
                <tr className="table-row" key={id}>
                    <td>{symbol}</td>
                    <td>{name}</td>
                    <td>$ {priceDollar}</td>
                    <td>{market_cap}</td>
                    <td className={priceStyling(OneDayChange)}>{OneDayChange}%</td>
                    <td className={priceStyling(SevenDayChange)}>{SevenDayChange}%</td>
                    <td className={priceStyling(ThirtyDayChange)}>{ThirtyDayChange}%</td>
                    <td className={priceStyling(YearChange)}>{YearChange}%</td>
                    <td>$ {allTimeHigh}</td>
                </tr>
            )
        })
    }

    render() {
        let renderObject;
        let { isLoading } = this.state;
        let { data } = this.state;

        // 1) it starts false and null
        // 2) then true and null 
        // 3) finally, true and has data 

        if (!isLoading && !data) {
            renderObject = <span>LOADING ... </span>
        }
        else if (isLoading && !data) {
            renderObject = <span>LOADING ... </span>
        }
        else {
            renderObject = (
                <table className="top-cryptos-table">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            )
        }


        return (
            <div>
                <h1>This is Home</h1>
                <section className="top-cryptos-container">
                    <h3>Top 20 </h3>

                    {renderObject}
                </section>
            </div>
        )
    }
}

export default Home;
