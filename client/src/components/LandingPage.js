import React from "react";
import { Link } from "react-router-dom";
import IntroSVG from "./IntroSVG"
import '../css/LandingPage.css';
import Dash from "../assets/dash.svg";
import Eth from "../assets/eth.svg";
import Monitor from "../assets/monitor.svg";

class LandingPage extends React.Component {

  render() {
    return (
      <div className="landing-page">

        <div className="call-action">
          <div className="captions">
            <h1>CryptWatch</h1>
            <h1>All the Coins. One place</h1>
          </div>

            <div className="login-aside">
              <button>
                <Link to="/home">Login</Link>
              </button>
            </div>
        </div>

        <div className="illustration">
          <img src={Dash} alt="dash img" id="dash" className="crypto-icons" />
          <img src={Eth} alt="eth img" id="eth" className="crypto-icons" />
          <img src={Monitor} alt="monitor img" id="monitor" />
        </div>

        <section className="footer-text">
          <h5>Being empowered means staying current on real time prices. Sign up and keep an eye on all the cryptocurrencies plummeting. Peace of mind is knowing how much you're losing.
          </h5>
        </section>


      </div>
    )
  }
}

export default LandingPage;
