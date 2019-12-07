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
            return <th key={idx}>{key}</th>
        })
    }

    renderTableData = () => {
        return this.state.data.map((coin, idx) => {

            const { id, symbol, name, price, market_cap, high } = coin
            const OneDayChange = coin["1d"].price_change_pct;
            const SevenDayChange = coin["7d"].price_change_pct;
            const ThirtyDayChange = coin["30d"].price_change_pct;
            const YearChange = coin.ytd.price_change_pct;

            return (
                <tr className="table-row" key={id}>
                    <td>{symbol}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>{market_cap}</td>
                    <td>{OneDayChange}</td>
                    <td>{SevenDayChange}</td>
                    <td>{ThirtyDayChange}</td>
                    <td>{YearChange}</td>
                    <td>{high}</td>
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
