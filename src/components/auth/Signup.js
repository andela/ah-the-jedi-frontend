import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SocialLogin from './Social';
import '../../assets/styles/signup.scss';
import '../../assets/styles/social.scss';

class SignupForm extends Component {
  render() {
    const { onSubmit, onChange, error, handleConfirmPassword, isLoading, social } = this.props;
    return (
      <div className="signup-page">
        <h1>Authors Haven</h1>
        <div className="signup-form" id="form">
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                isInvalid={error.errors && error.errors.email && error.errors.email[0]}
                type="email"
                placeholder="Enter email"
                id="email"
                name="email"
                onChange={onChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {error.errors && error.errors.email && error.errors.email[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                isInvalid={error.errors && error.errors.username && error.errors.username[0]}
                placeholder="Enter username"
                name="username"
                id="username"
                onChange={onChange}
                required
              />
              <Form.Control.Feedback id="username-error" type="invalid">
                {error.errors && error.errors.username && error.errors.username[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                isInvalid={error.errors && error.errors.password && error.errors.password[0]}
                type="password"
                placeholder="Enter password"
                name="password"
                id="password"
                onChange={onChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                {error.errors && error.errors.password && error.errors.password[0]}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                id="match"
                onChange={handleConfirmPassword}
                name="confirm_password"
                required
              />
            </Form.Group>

            <div />

            {!isLoading ? (
              <Button className="submit-btn" id="btn" type="submit" block>
                Sign Up
              </Button>
            ) : (
              <Button id="spinner-loading" variant="primary" disabled block>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                Loading...
              </Button>
            )}
          </Form>
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
              <p>Already have an account?</p>
              <Link className="login-text" to="/Login">
                {' '}
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SignupForm;
