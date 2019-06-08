import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/header.scss';

/*
 *@return {jsx} to display in the Header component
 *for navigation links when user is
 * logged out
 */
const LoggedOutLinks = () => (
  <div className="custom-nav-lo">
    <NavLink className="nav-link" to="/signup">
      Sign up
    </NavLink>
    <NavLink className="nav-link" to="/login">
      Login
    </NavLink>
  </div>
);

export default LoggedOutLinks;
