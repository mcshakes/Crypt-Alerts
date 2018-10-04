import React from "react";
import Client from "../Client";
import '../css/App.css';
import SearchBar from "./SearchBar"
import UserWatchlist from "./UserWatchlist"
import { authService } from "./AuthService"
import Login from "./Login";
import NavBar from "./NavBar";

import { Link } from 'react-router-dom';

class UserDashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      coins: [],
      query: ""
    }
    this.addCoinNameWatchlist = this.addCoinNameWatchlist.bind(this)
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

  addCoinNameWatchlist(coin) {
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
        <div>
          <NavBar
            isLoggedIn={this.isLoggedIn}
          />
        </div>
        <h1>YOUR DASHBOARD</h1>
        <SearchBar
          addNew={this.addCoinNameWatchlist}
        />
        <UserWatchlist
          coins={this.state.coins}
          ids={this.state.coins.map(coin => coin._id)}
        />
      </div>
    );
  }
}

export default UserDashboard;
