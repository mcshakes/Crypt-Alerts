import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "./pages/UserDashboard/UserDashboard";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import NavBar from "./components/NavBar";
import RequireAuth from "./RequireAuth";

import { Provider } from 'react-redux';
import store from "./store";

import { loadUser } from "./actions/authActions";

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider >
    )
  }
}



export default App;
