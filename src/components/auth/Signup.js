/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Label, Form, Icon } from 'semantic-ui-react';
import '../../assets/styles/signup.scss';
import { Link } from 'react-router-dom';

class SignupForm extends Component {
  render() {
    const { onSubmit, onChange, error, handleConfirmPassword, state } = this.props;
    return (
      <div className="signup-page">
        <h1>Authors Haven</h1>
        <div className="signup-form">
        <Form onSubmit={onSubmit} >
          <Form.Field>
            <label>Email</label>
            <input placeholder="email" name="email" onChange={onChange} required />
          </Form.Field>
          <Label basic color="red" name="emailError" className={error.errors && error.errors.email ? 'show' : 'hidden'} pointing>{error.errors && error.errors.email && error.errors.email[0]}</Label>
          <Form.Field>
            <label>Username</label>
            <input placeholder="username" name="username" onChange={onChange} required />
          </Form.Field>
          <Label basic color="red" className={error.errors && error.errors.username ? 'show' : 'hidden'} pointing>{error.errors && error.errors.username && error.errors.username[0]}</Label>
          <Form.Field>
            <label>Password</label>
            <input placeholder="password" name="password" onChange={onChange} type="Password" required />
          </Form.Field>
          <Label basic color="red" className={error.errors && error.errors.password ? 'show' : 'hidden'} pointing>{error.errors && error.errors.password && error.errors.password[0]}</Label>
          <Form.Field>
            <label>Confirm Password</label>
            <input placeholder="password" name="password" id='match' onChange={handleConfirmPassword} type="Password" required />
          </Form.Field>
          <div />
          <Button fluid type="submit" className="submit-btn">Sign Up</Button>
        </Form>
          <div className="separator">
            <div className="separator-line"/>
            <p className="separator-text" >OR</p>
            <div className="separator-line"/>
          </div>
          <div className="social">
            <Icon name='facebook f' size='large' circular className="social-facebook" />
            <Icon name='google g' size='large' circular className="social-google" />
          </div>
          <div className="login" >
            <p>Already have an account?</p><Link className="login-text" to='/Login'> Login</Link>
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
