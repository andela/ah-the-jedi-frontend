import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoggedOutLinks from './LoggedOutLinks';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/header.scss';

/*
* Header Component
*
*@return {js} to display header
*/
class Header extends Component {
  render() {
    return (
      <nav sticky="top" className="navbar navbar-expand-lg navbar-light">
        {/* <img src={ahLogo} alt="logo" className="logo" /> */}
        <NavLink className="navbar-brand" to="/">
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
          <ul className="navbar-nav ml-auto">
            <LoggedOutLinks />
          </ul>
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
