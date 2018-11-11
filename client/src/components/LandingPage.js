import React from "react";
import { Link } from "react-router-dom";
import IntroSVG from "./IntroSVG"
import '../css/LandingPage.css';

class LandingPage extends React.Component {


  render() {
    return (
      <div className="land-page">
        <section className="main-hero">
          <div className="captions">
            <h1>CryptWatch</h1>
            <h1>All the Coins. One place</h1>
          </div>

          <div className="explanation">
            <div className="login-aside">
              <button>
                <Link to="/home">Login</Link>
              </button>
            </div>
            <section className="intro-text">
              <h5>When it comes to watching money dwindle, stay current with real time prices. Sign up and keep an eye on all the cryptocurrencies plummeting. Peace of mind means knowing what you're losing.
              </h5>
            </section>
          </div>

          <div id="illustration">
            <img src="assets/dash.svg" alt="dash img" id="dash" className="crypto-icons" />
            <img src="assets/miota.svg" alt="iota img" id="iota" className="crypto-icons" />
            <img src="assets/eth.svg" alt="eth img" id="eth" className="crypto-icons" />
            <img src="assets/monitor.svg" alt="monitor img" id="monitor" />
          </div>

        </section>

        <div className="graph-image">
          <IntroSVG />
        </div>


      </div>
    )
  }
}

export default LandingPage;
