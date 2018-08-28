import React, { Component } from 'react';
import '../css/App.css';
import CapLeader from "./CapLeader";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Logout from "./Logout";
import { authService } from "./AuthService";
import UserDashboard from "./UserDashboard";

class App extends Component {

  authCheck = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">CryptAlert</h1>
        </header>
        <div className="container">
          <CapLeader />
          {authService.authenticated() ? <UserDashboard /> : <Login authCheck={this.authCheck}/>}
        </div>
      </div>
    );
  }
}

export default App;
