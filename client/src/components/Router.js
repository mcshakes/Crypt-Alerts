import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router'

import LandingPage from "../landingPage/LandingPage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />

    </Switch>
  </BrowserRouter>
)

export default Router;
