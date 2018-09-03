import React from "react";
import Client from "../Client";
import '../css/CapLeader.css';
import { authService } from "./AuthService"
import { Link } from 'react-router-dom';
import ListItem from "./ListItem"

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
      <div>
        <h2>These are the coins you are watching:</h2>
        <ul>
          {
            this.state.data.map((coin, idx) => {
              return <ListItem key={idx} coin={coin.ticker}/>
            })
          }
        </ul>
      </div>
    )
  }
}

export default UserWatchlist;
