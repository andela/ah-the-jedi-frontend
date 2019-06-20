import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';

import { setRead } from '../../redux/actions/notificationActions';

import { APP_URL } from '../../redux/constants';

export class Notifications extends Component {
  onClick = id => {
    const { setRead: readNotification, history } = this.props;

    readNotification(id, history);
  };

  render() {
    const { notifications } = this.props;

    const unread = (typeof notifications === 'string' && (
    <Dropdown.Item className="mt-3 mb-3">You’re all caught up.</Dropdown.Item>
    ))
      || (notifications.length > 0
        && notifications.map(notification => {
          const article = notification.url.split('articles/');

          const profile = notification.url.split('profiles/');

          const url = article.length > 1 ? `${APP_URL}articles/${article[1]}` : `${APP_URL}@${profile[1]}`;

          return (
            <Dropdown.Item
              href={url}
              className="notification-message"
              onClick={() => this.onClick(notification.id)}
              key={notification.id}
              id="notifyBtn"
            >
              <p className="notification-link">
                <span className="badge badge-primary badge-pill notify mr-2">
                  {!notification.read ? '.' : ''}
                </span>

                {notification.message}
              </p>
              <span className="date-span text-muted">
                {moment(notification.created_at).format('MMMM Do')}
              </span>
            </Dropdown.Item>
          );
        }));

    return <div>{unread}</div>;
  }
}

Notifications.propTypes = {
  setRead: PropTypes.func.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.shape({})),
  bookmarked: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

Notifications.defaultProps = {
  bookmarked: { error: '' },
  history: {},
  notifications: [{}],
};

const mapDispatchToProps = () => ({
  setRead,
});

export default connect(
  null,
  mapDispatchToProps(),
)(withRouter(Notifications));
