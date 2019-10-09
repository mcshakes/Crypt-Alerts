import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./pages/UserDashboard/UserDashboard";


const RequireAuth = ({ match: { path }, isAuthenticated }) =>
    !isAuthenticated ? (
        <Redirect to="/login" />
    ) : (
            < div >
                <Route exact path={`${path}/dashboard`} component={Dashboard} />
            </div >
        )

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated
}))(RequireAuth);