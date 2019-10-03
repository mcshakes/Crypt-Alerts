import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <ul>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/login">Login</NavLink> </li>
            </ul>
        </div>
    )
}

export default NavBar;