import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import SearchBar from "./SearchBar"
import { authService } from "./AuthService"
import Login from "./Login";
import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {
  state = {
    user: undefined
  }

  componentWillMount() {
    authService.checkAuthentication(this.props);
  }

  isLoggedIn = () => {
    return authService.authenticated()
  }

  render() {
    return (
      <div className="dashboard">
        <div className="menu">
          { this.isLoggedIn() ? (
            <Link to="/logout">
              Logout
            </Link>
          ) : (
            <Link to="/login">
              Login
            </Link>
          ) }
        </div>
        <SearchBar />
        <h1>HI, WELCOME TO USER DASHBOARD</h1>
      </div>
    );
  }
}

export default UserDashboard;
