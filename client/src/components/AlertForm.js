import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import { authService } from "./AuthService";

class AlertForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highLimit: "",
      lowLimit: ""
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addAlertLimits()
  }

  addAlertLimits = () => {
    let token = authService.getToken();
    let high = this.state.highLimit
    let low = this.state.lowLimit

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        high: high,
        low: low
      })
    };

    fetch("/api/set-alert", settings)
      .then((response) => {
        return response.json()
      })
      .catch(err => {
        return err
      })
  }

  render() {
    return (
      <div>
        <form className="alert-form"
              onSubmit={this.handleSubmit}
          >
          <label>Set High Limit</label>
          <input
            type="text"
            name="highLimit"
            onChange={this.handleChange}
          />
          <label>Set Low Limit</label>
          <input
            type="text"
            name="lowLimit"
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AlertForm;
