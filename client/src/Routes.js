import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./pages/UserDashboard/UserDashboard";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NavBar from "./components/NavBar";

const Routes = () => (
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </Router>
)

export default Routes;
