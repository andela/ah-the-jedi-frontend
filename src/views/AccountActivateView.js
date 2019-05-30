import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/styles/emailsent.scss';
import { Link } from 'react-router-dom';
import { activateUser } from '../redux/actions/ActivateAccountAction';

class AccountActivated extends Component {
  componentDidMount() {
    const { activateUser } = this.props;
    var query = window.location.search.substring(1);
    var query_str = query.split('&')[0];
    var uid = query_str.substring(query_str.lastIndexOf('=') + 1);
    var token = query.substring(query.lastIndexOf('=') + 1);
    activateUser(uid, token);
  }

  render() {
    return (
      <div className="emailsent-page">
        <h1>Activated</h1>
        <div className="emailsent-view">
          <p>Your account has been activated.</p>
          <p>You can now log in.</p>
        </div>
        <div className="footer">
          <Link className="footer-login" to="/login">
            {' '}
            Login
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  activateUser,
});

const mapStateToProps = state => ({
  error: state.signup.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AccountActivated);
