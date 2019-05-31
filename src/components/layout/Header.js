import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { isLoggedIn } from '../../helpers';
import { connect } from 'react-redux';

class Header extends Component {
  componentWillMount() {
    const links = login.isAuthentincated ? (
      <LoggedInLinks />
    ) : (
      <LoggedOutLinks />
    );
  }
  render() {
    const { login } = this.props;
    const links = login.isAuthentincated ? (
      <LoggedInLinks />
    ) : (
      <LoggedOutLinks />
    );
    return (
      <Menu>
        <NavLink to="/">
          <Menu.Item header>Authors Haven</Menu.Item>
        </NavLink>
        <Menu.Menu position="right">
          <NavLink to="/">
            <Menu.Item name="Home" />
          </NavLink>
          {links}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  login: state.LoginReducer
});

export default connect(
  mapStateToProps,
  null
)(Header);
