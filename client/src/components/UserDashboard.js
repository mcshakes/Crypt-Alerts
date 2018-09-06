import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import SearchBar from "./SearchBar"
import UserWatchlist from "./UserWatchlist"
import { authService } from "./AuthService"
import Login from "./Login";
import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {
  state = {
    data: []
  }

  componentWillMount() {
    authService.checkAuthentication(this.props);
  }

  isLoggedIn = () => {
    return authService.authenticated()
  }

  getAllCoins = () => {
    let token = authService.getToken();

    const settings = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };

  return fetch("/api/coin-watchlist", settings)
    .then((response) => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      return err
    })
  }

  addWishlist = () => {
    this.getAllCoins()
      .then(things => {
        this.setState({
          data: things
        })
      })
    console.log("CHILD WAS CLICKED")
  }

  componentDidMount() {
    this.getAllCoins()
      .then(things => {
        this.setState({
          data: things
        })
      })
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
        <h1>HI, WELCOME TO USER DASHBOARD</h1>
        <SearchBar
          addWishlist={this.addWishlist}
        />
        <UserWatchlist
          data={this.state.data}
        />
      </div>
    );
  }
}

export default UserDashboard;
