import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import '../../assets/styles/login.scss';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  render() {
    const { onSubmit, onChange, email, password } = this.props;
    return (
      <div className="sign-in-page">
        <h1>Authors Haven</h1>
        <div className="signin-form">
          <h1>Login</h1>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label id="test">Email</label>
              <input
                placeholder="email"
                id="email"
                type="email"
                onChange={onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="password"
                id="password"
                onChange={onChange}
                type="Password"
                required
              />
            </Form.Field>
            <Button
              fluid
              className="submit-btn"
              disabled={
                !email.match(/^[a-zA-z0-9_.]+@[a-zA-z0-9-]+\.[a-z]+$/) ||
                !password.match(/^[a-zA-Z0-9]{8,}$/)
              }
              type="submit"
            >
              Login
            </Button>
          </Form>
          <div>
            <div className="separator">
              <div className="separator-line" />
              <p className="separator-text">OR</p>
              <div className="separator-line" />
            </div>
            <div className="social">
              <Icon
                name="facebook f"
                size="large"
                circular
                className="social-facebook"
              />
              <Icon
                name="google"
                size="large"
                circular
                className="social-google"
              />
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

export default LoginForm;
