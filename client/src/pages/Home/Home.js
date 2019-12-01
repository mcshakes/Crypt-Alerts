import React from "react";
import "./Home.css";
import IOClient from "socket.io-client";


class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            response: false,
            ioEndpoint: "/capleader"
        }
    }

    // const topCryptoSocket = io("/capleader");
    componentDidMount() {
        const { ioEndpoint } = this.state;
        const socket = IOClient(ioEndpoint);
        socket.on("FromAPI", data => {
            this.setState({
                response: data
            })
        })
    }

    render() {
        return (
            <div>
                <h1>This is Home</h1>
                <section className="top-cryptos-container">
                    <h3>Top 20 </h3>
                    <ul>

                    </ul>
                </section>
            </div>
        )
    }
}

export default Home;
