import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import CapLeader from "./CapLeader";
import Login from "./Login";
import Logout from "./Logout";
import UserDashboard from "./UserDashboard";
import AuthService from "./AuthService";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route path='/logout' component={Logout} />
      <Route exact path="/dashboard" component={UserDashboard} />
    </Switch>
  </BrowserRouter>
)

export default Router;
