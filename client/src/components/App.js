import React, { Component } from 'react';
import '../css/App.css';
import CapLeader from "./CapLeader";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import { authService } from "./AuthService";
import UserDashboard from "./UserDashboard";
import NavBar from "./NavBar";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class App extends Component {

  authCheck = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">
        <header className="app-header">
          <h1 className="app-title">CryptWatch</h1>
          <p>Track your favorite cryptocurrencies</p>
        </header>
        <CapLeader />
        {authService.authenticated() ?
          <UserDashboard /> :
          <Login authCheck={this.authCheck}/>}
      </div>
    );
  }
}

export default App;
