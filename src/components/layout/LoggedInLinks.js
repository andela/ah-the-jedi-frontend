import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/loginActions';
import { withRouter } from 'react-router-dom';

class LoggedInLinks extends React.Component {
  handleLogout = () => {
    localStorage.clear();
    const { logoutUser } = this.props;
    logoutUser();
    this.props.history.push('/login');
  };

  render() {
    return <Menu.Item onClick={this.handleLogout} name="Logout" />;
  }
}

const mapStateToProps = state => ({
  login: state.loginUser,
  error: state.LoginReducer.error
});

const mapDispatchToProps = () => ({
  logoutUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(withRouter(LoggedInLinks));
