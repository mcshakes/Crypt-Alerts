import React from 'react';

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.email,
      password: event.target.password
    })
  }

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
        </form>
      </div>
    );
  }
}

export default Login;
