import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoggedInLinks from './LoggedInLinks';
import LoggedOutLinks from './LoggedOutLinks';
import { isLoggedIn } from '../../helpers';
import { Navbar } from 'react-bootstrap';
import '../../assets/styles/header.scss';

class Header extends Component {
  render() {
    const { login } = this.props;
    /*
     *check whether user is logged in and displays appropriate links
     */
    const links = login.isAuthentincated || isLoggedIn() ? <LoggedInLinks /> : <LoggedOutLinks />;
    return (
      <Navbar
        fixed="top"
        className="navbar navbar-expand-lg navbar-light"
        data-set="nav-bar-test"
      >
        <NavLink className="navbar-brand" to="/" data-set="nav-bar-brand-test">
          Authors Haven
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">{links}</ul>
        </div>
      </Navbar>
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
