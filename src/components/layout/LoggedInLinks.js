/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/loginActions';

/*
 *@return {jsx} to display in the Header component
 *for navigation links when user is logged in
 */
class LoggedInLinks extends React.Component {
  handleLogout = () => {
    localStorage.clear();
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const username = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).username
      : '';

    const profile = `/@${username}`;

    return (
      <div className="row ml-5">
        <div className="col-md-10">
          <a
            className="nav-link dropdown-toggle ml-5"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fa fa-user-circle ml-3 mr-2" />
            <span className="mr-1 ">{username}</span>
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <div className="col-md-6">
              <NavLink className="nav-link" to="/create">
                Create Article
              </NavLink>
            </div>
            <div className="col-md-6">
              <NavLink to={profile} className="nav-link">
                Profile
              </NavLink>
            </div>
            <div className="col-md-6">
              <NavLink
                className="nav-link"
                onClick={this.handleLogout}
                to="/login"
                data-set="nav-bar-logout-test"
              >
                Logout
              </NavLink>
            </div>
          </div>
        </div>
        <div className="col-md-2" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginUser,
  error: state.LoginReducer.error,
});

const mapDispatchToProps = () => ({
  logoutUser,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(LoggedInLinks));
