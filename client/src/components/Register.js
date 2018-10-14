import React from "react";
import FormErrors from "./FormErrors";
import '../css/Forms.css';
import { Link, BrowserRouter, Route } from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password} = this.state;
    fetch("/api/users/signup", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(res => res.json())
      .then(response => {
        if (!response.success) {
          this.setState({
            hasError: response.message
          })
          this.props.history.push("/register");
          window.location.reload();
        } else {
          localStorage.setItem("token", response.token)
          this.props.authCheck()
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
      <div className="register-container">
        <div>
          <FormErrors formErrors={this.state.hasError} />
        </div>
          <form className="register-form" onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <label>Phone Number</label>
          <button type="submit">
            Register
          </button>
        </form>
      </div>
    )
  }
}

export default Register;
