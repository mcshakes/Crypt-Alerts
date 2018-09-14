import React from 'react';
import Login from "./Login";
import Register from "./Register";

class UserLoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      isRegister: false,
      isLogin: true
    }
  }

  switchForm = (word) => {
    let isRegister, isLogin;

    if (word === "signup") {
      isRegister = true;
      isLogin = false
    } else {
      isRegister = false;
      isLogin = true
    }

    return this.setState({
      isRegister: isRegister,
      isLogin: isLogin
    })
  }

  

  render() {
    return (
      <div className="user-entry-screen">

      </div>
    )
  }

}

export default UserLoginScreen;
