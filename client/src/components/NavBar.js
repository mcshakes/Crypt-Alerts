import React from 'react';
import Login from "./Login";
import { Link } from 'react-router-dom';
import { authService } from "./AuthService"

class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    authService.checkAuthentication(this.props);
  }

  isLoggedIn = () => {
    return authService.authenticated()
  }

  render() {
    return (
      <div className="menu">
        { this.isLoggedIn() ? (
          <Link to="/logout">
            Logout
          </Link>
        ) : (
          <Link to="/login">
            Login
          </Link>
        ) }
      </div>
    )
  }
}

export default NavBar;
