import React from "react";
import "./Home.css";
import TopCryptoAssets from "../../components/topCryptoAssets/topCryptoAssets";

class Home extends React.Component {

    render() {
        return (
            <div>
                <section className="landing-hero">
                    <h1>Crypto News</h1>
                    <h3>Track your coins and keep up with all the news</h3>
                </section>
                <section className="top-cryptos-container">
                    <h3>Top 20 Crypto Assets</h3>
                    <TopCryptoAssets />
                </section>
            </div>
        )
    }
}

export default Home;
