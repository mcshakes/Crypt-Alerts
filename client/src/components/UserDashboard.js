import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import SearchBar from "./SearchBar"
import { authService } from "./AuthService"
import Login from "./Login";

class UserDashboard extends React.Component {
  state = {
    user: undefined
  }

  componentWillMount() {
    // this.checkAuthentication(this.props);
    // const auth = new AuthService()
    authService.checkAuthentication(this.props);
  }

  isLoggedIn = () => {
    return authService.authenticated()
  }

  render() {
    return (
      <div className="dashboard">
      <SearchBar />
        <h1>HI, WELCOME TO USER DASHBOARD</h1>
        {!this.isLoggedIn() && <Login />}
      </div>
    );
  }
}

export default UserDashboard;
