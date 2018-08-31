import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import { authService } from "./AuthService"
import { Link } from 'react-router-dom';

class UserWatchlist extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
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

    fetch("/api/coin-watchlist", settings)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log("from FETCH", json)
      this.setState({ data: json.watchlist })
    })
    .catch(err => {
      return err
    })
  }

  componentDidMount() {
    this.getAllCoins()
  }


  render() {
    return (
      <div>
        These are the coins you are watching:
        {this.state.data.map((coin) => <div>{coin}</div>)}
      </div>
    )
  }
}

export default UserWatchlist;
