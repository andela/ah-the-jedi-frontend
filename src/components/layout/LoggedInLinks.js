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
    return (
      <>
        <NavLink
          className="nav-link"
          onClick={this.handleLogout}
          to="/login"
          data-set="nav-bar-logout-test"
        >
          Logout
        </NavLink>
      </>
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
