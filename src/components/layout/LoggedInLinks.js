/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Popover, OverlayTrigger, Dropdown, Col, Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { logoutUser } from '../../redux/actions/loginActions';
import {
  fetchAllNotifications,
  fetchUnreadNotifications,
} from '../../redux/actions/notificationActions';
import OptInOutView from '../../views/OptInOutView';
import NotificationView from '../notifications/Notifications';
import '../../assets/styles/header.scss';

/*
 *@return {jsx} to display in the Header component
 *for navigation links when user is logged in
 */
class LoggedInLinks extends React.Component {
  componentDidMount() {
    const {
      fetchAllNotifications: fetchAll,
      fetchUnreadNotifications: fectchUnread,
      history,
    } = this.props;

    fetchAll(history);
    fectchUnread(history);
  }

  handleLogout = () => {
    localStorage.clear();
    const { logoutUser: userLogout } = this.props;
    userLogout();
  };

  render() {
    const {
      notifications: { notifications, unread },
    } = this.props;

    const popover = (
      <Popover id="popover-basic" title="Notifications">
        <Dropdown className={typeof notifications === 'string' ? '' : 'notification-dropdown'}>
          <NotificationView notifications={notifications} />
        </Dropdown>

        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={(
            <Popover id="popover-basic">
              <div className="container">
                <Col>
                  <Row>
                    <div className="col text-left">
                      <strong>Choose what you want to opt in/out of</strong>
                      <hr />
                      <OptInOutView />
                    </div>
                  </Row>
                </Col>
              </div>
            </Popover>
)}
          rootClose
        >
          <Dropdown.Toggle variant=" focus-click" id="dropdown-basic">
            Notification Settings
          </Dropdown.Toggle>
        </OverlayTrigger>
      </Popover>
    );

    const OptInOut = () => (
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <i className="fa fa-bell-o nav-link ml-4" aria-hidden="true">
          <span className="badge badge-primary badge-pill notify-count">
            {typeof notifications !== 'string' && unread.length}
          </span>
        </i>
      </OverlayTrigger>
    );

    const username = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).username
      : '';

    const profile = `/@${username}`;

    return (
      <div className="row">
        <div className="col-md-10 navbar-custom">
          <NavLink className="nav-link" to="/search">
            <span role="img" aria-label="search">
              &#128269;
            </span>
          </NavLink>
          <OptInOut className="mr-5 ml-5" />
          <a
            className="nav-link dropdown-toggle"
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
          <div className="dropdown-menu align-rt dropdown-custom" aria-labelledby="navbarDropdown">
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

LoggedInLinks.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  fetchAllNotifications: PropTypes.func.isRequired,
  fetchUnreadNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

LoggedInLinks.defaultProps = {
  history: {},
  notifications: {},
};

const mapStateToProps = state => ({
  login: state.loginUser,
  error: state.LoginReducer.error,
  notifications: state.notifications,
});

const mapDispatchToProps = () => ({
  logoutUser,
  fetchAllNotifications,
  fetchUnreadNotifications,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(LoggedInLinks));
