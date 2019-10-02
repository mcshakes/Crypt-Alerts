import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'

import LandingPage from "../landing-page/LandingPage";
import Dashboard from "../user-dashboard/dashboard";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
)

export default Router;
