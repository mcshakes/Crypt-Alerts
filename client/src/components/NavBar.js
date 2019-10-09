import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = (props) => {
    console.log("NAVBAR", props.isAuthenticated)
    return (
        <div>
            <ul>
                {props.isAuthenticated && (
                    <li><NavLink to="/user/dashboard">Dashboard</NavLink></li>
                )}
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink> </li>
            </ul>
        </div>
    )
}

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated
}))(NavBar);

// export default NavBar;