import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const LoggedOutLinks = () => (
  <NavLink to="/login">
    <Menu.Item name="login" />
  </NavLink>
);

export default LoggedOutLinks;
