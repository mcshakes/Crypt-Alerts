import React from 'react';
import { Route, Redirect, browserHistory} from 'react-router';
import { Link } from "react-router-dom";
import FormErrors from "./FormErrors";
import Register from "./Register";

class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state={
      registerHidden: true,
      email: "",
      password: ""
    }
  }

  switchForm = () => {
    this.setState({
      registerHidden: !this.state.registerHidden
    })
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
      .then(res => res.json())
      .then(response => {
        if (!response.success) {
          this.setState({
            hasError: response.message
          })
          this.props.history.push("/login");
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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { registerHidden } = this.state;

    if ( registerHidden === true) {
      return (
        <div>
          <p>
            Don't have an account with us? Create one!
            <br/>
            <button
              onClick={this.switchForm}
              >
                Sign Up
              </button>
          </p>

          <div className="login-form">
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
              <button

                type="submit">
                Log In
              </button>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Register authCheck={this.props.authCheck}/>
        </div>
      )
    }

  }
}

// class Login extends React.Component {
//
//   state = {
//     email: "",
//     password: ""
//   }
//
//   handleSubmit = (event) => {
//     event.preventDefault();
//
//     const { email, password } = this.state;
//
//     fetch("/api/users/login", {
//       method: "POST",
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: email,
//         password: password
//       })
//     })
//       .then(res => res.json())
//       .then(response => {
//         if (!response.success) {
//           this.setState({
//             hasError: response.message
//           })
//           this.props.history.push("/login");
//           window.location.reload();
//
//         } else {
//           localStorage.setItem("token", response.token)
//           this.props.authCheck()
//         }
//
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
//
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }
//
//   render() {
//     return (
//       <div className="login-form">
//         <div>
//           <FormErrors formErrors={this.state.hasError} />
//         </div>
//           <form onSubmit={this.handleSubmit}>
//           <label>Email</label>
//           <input
//             type="text"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             onChange={this.handleChange}
//             value={this.state.password}
//           />
//           <button
//
//             type="submit">
//             Log In
//           </button>
//         </form>
//
//       <p>
//         Don't have an account with us? Create one!
//         <br/>
//         <Link to="/register">Sign Up</Link>
//       </p>
//       </div>
//     );
//   }
// }

export default Login;
