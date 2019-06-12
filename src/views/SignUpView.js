/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/SignUpAction';
import SignupForm from '../components/auth/Signup';

/*
 * SignUpView Component
 *
 *@return {js} to display SignUpView
 */

class SignUpView extends Component {
  state = {
    email: '',
    username: '',
    bio: '',
    password: '',
    confirm_password: '',
    isInvalid: true,
    isLoading: false,
  };

  /*
   * onChange:
   * gets the values from the inputs
   * and adds them to the state
   */
  onChange = event => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  /*
   * onSubmit:
   * checks whether passwords match
   * if the passwords match
   * submits form data
   */
  onSubmit = event => {
    event.preventDefault();

    const { password: statePassword, confirm_password: confirmPassword } = this.state;
    if (statePassword === confirmPassword) {
      const { signUpUser: userSignup } = this.props;
      const {
        email, username, bio, password,
      } = this.state;
      userSignup({
        user: {
          email,
          username,
          bio,
          password,
        },
      });
    }
  };

  /*
   * handleConfirmPassword:
   * checks if value of password
   * and confirm passwords match
   */
  handleConfirmPassword = e => {
    const { password } = this.state;
    this.setState({ confirm_password: e.target.value });
    /* istanbul ignore next */
    if (e.target.value !== password) {
      document.getElementById('match').style.borderColor = 'red';
      document.getElementById('confirm-error').innerText = 'Ensure that both passwords match';
      return false;
    }
    document.getElementById('match').style.borderColor = 'green';
    document.getElementById('confirm-error').innerText = '';
    this.setState({ isInvalid: false });
    return true;
  };

  render() {
    const { error } = this.props;
    const {
      signup: { isLoading },
    } = this.props;
    return (
      <SignupForm
        onChange={this.onChange}
        state={this.state}
        handleConfirmPassword={this.handleConfirmPassword}
        onSubmit={this.onSubmit}
        isLoading={isLoading}
        error={error}
      />
    );
  }
}

SignUpView.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  signup: PropTypes.shape({}),
};

SignUpView.defaultProps = {
  error: {},
  signup: { isLoading: false },
};

const mapDispatchToProps = () => ({
  signUpUser,
});

const mapStateToProps = state => ({
  error: state.signup.error,
  signup: state.signup,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(SignUpView);
