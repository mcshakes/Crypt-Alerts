import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'

import App from "./App";
import CapLeader from "./CapLeader";
import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import UserDashboard from "./UserDashboard";
import LandingPage from "./LandingPage";
import { authService } from "./AuthService";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/home" component={App} />
      <Route exact path="/" component={LandingPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path='/logout' component={Logout} />
      {/* <Route exact path="/dashboard" component={UserDashboard} /> */}

      <Route exact path="/dashboard" render={() => (
        authService.loggedIn ? (
          <Redirect to="/dashboard" />
        ) : (
          <Login />
        )
      )}/>
    </Switch>
  </BrowserRouter>
)

export default Router;
