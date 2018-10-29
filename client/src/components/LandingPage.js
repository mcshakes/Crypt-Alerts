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
            <h1>Watch and Hodl. All in one place</h1>
          </div>

          <div className="explanation">
            <div className="login-aside">
              <button>
                <Link to="/home">Login</Link>
              </button>
            </div>
            <section className="intro-text">
              <h5>When it comes to I've always enjoyed watching my money dwindle with the constant . Now, I can sign up and keep an eye on all the cryptocurrencies plummeting, giving me peace of mind. Better to know what you’re losing than not know.
              </h5>
            </section>
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
