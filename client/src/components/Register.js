import React from "react";
import FormErrors from "./FormErrors";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      phoneNumber: ""
    }
  }

  render() {
    return(
      <div className="register-form">
        <div>
          <FormErrors formErrors={this.state.hasError} />
        </div>
          <form onSubmit={this.handleSubmit}>
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
          <input
            type="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange}
            value={this.state.phoneNumber}
          />
          <button type="submit">
            Register
          </button>
        </form>
      </div>
    )
  }
}

export default Register;
