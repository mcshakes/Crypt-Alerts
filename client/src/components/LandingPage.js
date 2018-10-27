import React from "react";
import { Link } from "react-router-dom";
import IntroSVG from "./IntroSVG"
import '../css/LandingPage.css';

class LandingPage extends React.Component {


  render() {
    return (
      <div>
        <h1>CryptWatch</h1>
        <h2>Watch and Hodl. All in one place</h2>
        <Link to="/home">Login</Link>
        <h5>When it comes to I've always enjoyed watching my money dwindle with the constant . Now, I can sign up and keep an eye on all the cryptocurrencies plummeting, giving me peace of mind. Better to know what you’re losing than not know.
        </h5>

        <div className="graph-image">
          <IntroSVG />
        </div>


      </div>
    )
  }
}

export default LandingPage;
