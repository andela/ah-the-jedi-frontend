import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <Menu>
        <NavLink to="/">
          <Menu.Item header>Authors Haven</Menu.Item>
        </NavLink>
        <NavLink to="/">
          <Menu.Item name="Home" />
        </NavLink>
        <NavLink to="/login">
          <Menu.Item name="login" />
        </NavLink>
      </Menu>
    );
  }
}
