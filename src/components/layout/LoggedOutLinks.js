import React from 'react';
import { NavLink } from 'react-router-dom';

/*
 *@return {jsx} to display in the Header component
 *for navigation links when user is
 * logged out
 */
const LoggedOutLinks = () => (
  <>
    <NavLink className="nav-link" to="/signup">
      Sign up
    </NavLink>
    <NavLink className="nav-link" to="/login">
      Login
    </NavLink>
  </>
);

export default LoggedOutLinks;
