import React from "react";
import Client from "../Client";
import '../css/UserWatchlist.css';
import { authService } from "./AuthService";

class AlertForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highLimit: "",
      lowLimit: "",
      mode: "view"
    }
  }

  componentDidMount () {
    this.setState({
      lowLimit: this.props.low,
      highLimit: this.props.high
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addAlertLimits();
    this.setState({
      mode: "view"
    })
  }

  handleEdit = () => {
    this.setState({ mode: "edit" })
  }

  addAlertLimits = () => {
    let token = authService.getToken();
    let high = this.state.highLimit
    let low = this.state.lowLimit
    let ticker = this.props.ticker

    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        high: high,
        low: low,
        ticker: ticker
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
    if (this.state.mode === "view") {
      return (
        <div>
          <p>Your High: {this.state.highLimit}</p>
          <p>Your Low: {this.state.lowLimit}</p>
          <button onClick={this.handleEdit}>
            Edit Price Alerts
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <form className="alert-form"
                onSubmit={this.handleSubmit}
            >
            <label>Set High Limit</label>
            <input
              type="text"
              name="highLimit"
              value={this.state.highLimit}
              onChange={this.handleChange}
            />
            <label>Set Low Limit</label>
            <input
              type="text"
              name="lowLimit"
              value={this.state.lowLimit}
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
  }
}

export default AlertForm;
