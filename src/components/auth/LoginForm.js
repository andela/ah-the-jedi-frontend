import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SocialLogin from './Social';
import displayError from '../../helpers/inputerror';
import '../../assets/styles/login.scss';
import '../../assets/styles/common.scss';

/*
 * LoginForm Component
 *
 *@return {jsx}
 */

class LoginForm extends Component {
  render() {
    const {
      onSubmit, onChange, error, email, password, isLoading,
    } = this.props;

    return (
      <div className="sign-in-page">
        <h1>Authors Haven</h1>
        <div className="signin-form " data-set="loginTestDiv">
          <h1>Login</h1>
          <Form onSubmit={onSubmit} data-set="formTestDiv">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                isInvalid={
                  !!(
                    (error && error.data && error.data.errors && error.data.errors.error)
                    || (error && error.data && error.data.user)
                  )
                }
                placeholder="Enter email"
                type="email"
                id="email"
                data-test="email1"
                onChange={onChange}
                required
              />
              <Form.Control.Feedback id="email-error" type="invalid">
                {error
                  && error.data
                  && error.data.errors
                  && error.data.errors
                  && error.data.errors.error[0]}
                {error
                && error.data
                && error.data.errors
                && error.data.errors
                && error.data.errors.error
                  ? displayError('email-error')
                  : ''}

                {error
                  && error.data
                  && error.data.user
                  && 'This user account is not active. Check your email for activation instructions.'}
                {error && error.data && error.data.user && error.data.user.detail
                  ? displayError('email-error')
                  : ''}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter password"
                id="password"
                data-test="password"
                className="password"
                onChange={onChange}
                type="Password"
                required
              />
            </Form.Group>
            {!isLoading ? (
              <Button
                className="submit-btn"
                type="submit"
                id="login-btn"
                block
                disabled={
                  !email.match(/^[a-zA-z0-9_.]+@[a-zA-z0-9-]+\.[a-z]+$/)
                  || !password.match(/^[a-zA-Z0-9]{8,}$/)
                }
              >
                Login
              </Button>
            ) : (
              <Button variant="primary" id="loading-btn" disabled block>
                <Spinner
                  as="span"
                  animation="border"
                  id="loading-btn"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </Button>
            )}
          </Form>
          <div className="forgot-password-link">
            <Link to="/reset_password">Forgot your password?</Link>
          </div>
          <div>
            <div className="separator">
              <div className="separator-line" />
              <p className="separator-text">OR</p>
              <div className="separator-line" />
            </div>
            <div className="rounded-social-buttons">
              <SocialLogin />
            </div>
            <div className="login">
              <p>No account?</p>
              <Link className="login-text" to="/signup">
                Signup here.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  email: PropTypes.string,
  password: PropTypes.string,
  isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
  error: {},
  email: '',
  password: '',
  isLoading: false,
};

export default LoginForm;
