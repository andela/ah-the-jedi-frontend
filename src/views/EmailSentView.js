import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/styles/emailsent.scss';

/*
* EmailSentView Component
*
*@return {js} to display EmailSentView
*/
class EmailSentView extends Component {
  render() {
    return (
      <div className="emailsent-page">
        <h1>Email verification sent</h1>
        <div className="emailsent-view" id="emailsent-view">
          <p id="">Account succesfully registered.</p>
          <p>Check your mail inbox to activate your account.</p>
        </div>
        <div className="footer">
          <Link className="footer-home" to="/">
            {' '}
            Home
          </Link>
          <Link className="footer-login" to="/">
            {' '}
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default connect()(EmailSentView);
