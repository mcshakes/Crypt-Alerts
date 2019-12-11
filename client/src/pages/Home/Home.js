import React from "react";
import "./Home.css";
import TopCryptoAssets from "../../components/topCryptoAssets/topCryptoAssets";

class Home extends React.Component {

    // componentDidMount() {
    //     this.fetchAllMarketLeaders()
    // }

    // fetchAllMarketLeaders = () => {
    //     this.setState({ isLoading: true })

    //     const { ioEndpoint } = this.state;
    //     const socket = IOClient(ioEndpoint);

    //     socket.on("FromAPI", data => {
    //         this.setState({
    //             data: data,
    //         })
    //     })
    // }







    render() {



        return (
            <div>
                <h1>This is Home</h1>
                <section className="top-cryptos-container">
                    <h3>Top 20 </h3>
                    <TopCryptoAssets />
                </section>
            </div>
        )
    }
}

export default Home;
