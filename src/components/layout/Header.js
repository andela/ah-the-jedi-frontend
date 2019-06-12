import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { isLoggedIn } from '../../helpers';
import '../../assets/styles/header.scss';

class Header extends Component {
  render() {
    const { login } = this.props;
    /*
     *check whether user is logged in and displays appropriate links
     */
    const links = login.isAuthentincated || isLoggedIn() ? <LoggedInLinks /> : <LoggedOutLinks />;
    return (
      <nav sticky="top" className="navbar navbar-expand-lg navbar-light" data-set="nav-bar-test">
        <NavLink className="navbar-brand" to="/" data-set="nav-bar-brand-test">
          Authors Haven
        </NavLink>

        <div className="collapse navbar-collapse align-rt" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">{links}</ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  login: state.LoginReducer,
});

export default connect(
  mapStateToProps,
  null,
)(Header);
