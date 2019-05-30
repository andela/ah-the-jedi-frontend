import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/header.scss';
import ahLogo from '../../assets/images/ah_logo.jpg';

export default class Header extends Component {
  render() {
    return (
      <Menu className="navbar">
        <img src={ahLogo} alt="logo" className="logo" />
        <NavLink to="/">
          <Menu.Item header>Authors Haven</Menu.Item>
        </NavLink>
        <Menu.Menu position="left">
          <NavLink to="/">
            <Menu.Item name="Home" />
          </NavLink>
        </Menu.Menu>
        <Menu.Menu position="right">
          <NavLink to="/signup">
            <Menu.Item name="SignUp" />
          </NavLink>
        </Menu.Menu>
      </Menu>
    );
  }
}
