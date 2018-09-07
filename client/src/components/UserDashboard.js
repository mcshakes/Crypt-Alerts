import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import SearchBar from "./SearchBar"
import UserWatchlist from "./UserWatchlist"
import { authService } from "./AuthService"
import Login from "./Login";
import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: []
    }
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

  addCoinWatchlist(coin) {
    this.setState((state) => ({
      coins: state.coins.concat([coin])
    }))
  }

  componentDidMount() {
    this.getAllCoins()
      .then(things => {
        this.setState({
          coins: things
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
          addNew={this.addCoinWatchlist}
        />
        <UserWatchlist
          data={this.state.coins}
        />
      </div>
    );
  }
}

export default UserDashboard;
