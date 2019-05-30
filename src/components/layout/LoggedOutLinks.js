import React from 'react';
import { NavLink } from 'react-router-dom';

/*
* LoggedOutLinks Component
*
*@return {js}
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
