import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css"

const NavBar = (props) => {
    return (
        <nav>
            <ul className="nav-list-items">
                {props.isAuthenticated && (
                    <li><NavLink to="/user/dashboard">Dashboard</NavLink></li>
                )}
                <li><NavLink to="/home">Home</NavLink></li>

                {!props.isAuthenticated && (
                    <li><NavLink to="/login">Login</NavLink> </li>
                )}
            </ul>
        </nav>
    )
}

export default connect(state => ({
    isAuthenticated: state.auth.isAuthenticated
}))(NavBar);

