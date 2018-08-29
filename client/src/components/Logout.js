import React from 'react';
import { Redirect } from 'react-router-dom';
import { authService } from "./AuthService"

class Logout extends React.Component {
  constructor(props) {
    super(props);
    authService.logout();
  }

  render() {
    return (
      <Redirect
        to="/"
      />
    )
  }
}

export default Logout;
