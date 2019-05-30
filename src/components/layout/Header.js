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
        <Menu.Menu position="right">
          <NavLink to="/">
            <Menu.Item name="Home" />
          </NavLink>
          {!localStorage.getItem('token') ? (
            <NavLink to="/login">
              <Menu.Item name="login" />
            </NavLink>
          ) : (
            <NavLink to="/">
              <Menu.Item name="logout" />
            </NavLink>
          )}
          {/* <NavLink to="/login">
            <Menu.Item name="login" />
          </NavLink> */}
        </Menu.Menu>
      </Menu>
    );
  }
}
