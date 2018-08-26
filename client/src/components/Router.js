import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import CapLeader from "./CapLeader";
import PrivateRoute from "./PrivateRoute";
import UserDashboard from "./UserDashboard";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/" component={CapLeader}/>
      <PrivateRoute path="/dashboard" component={UserDashboard} exact/>
    </Switch>
  </BrowserRouter>
)

export default Router;
