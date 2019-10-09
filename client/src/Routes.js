import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./pages/UserDashboard/UserDashboard";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import NavBar from "./components/NavBar";
import RequireAuth from "./RequireAuth";

const Routes = () => (
  < Router >
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/user" component={RequireAuth} />
        <Route path="/login" component={Auth} />
      </Switch>
    </div>
  </Router >
)


export default Routes;
