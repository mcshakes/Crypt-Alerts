import React from 'react';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.email,
      password: event.target.password
    })
  }

  // validateForm() {
  //   return this.state.email.length > 0 && this.state.password.length > 0;
  // }

  render() {
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button
            // disabled={!this.validateForm()}
            type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
