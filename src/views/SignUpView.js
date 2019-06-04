import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpUser } from '../redux/actions/SignUpAction';
import SignupForm from '../components/auth/Signup';
import { UserSocialLogin } from '../redux/actions/loginActions';
import SocialLogin from '../components/auth/Social';

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
    if (this.state.password === this.state.confirm_password) {
      const { signUpUser } = this.props;
      const { email, username, bio, password } = this.state;
      signUpUser({
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
    this.setState({ confirm_password: e.target.value });
    /* istanbul ignore next */
    if (e.target.value !== this.state.password) {
      document.getElementById('match').style.borderColor = 'red';
      return false;
    } else {
      document.getElementById('match').style.borderColor = 'green';
      return true;
    }
  };

  render() {
    const { error } = this.props;
    return (
      <SignupForm
        onChange={this.onChange}
        state={this.state}
        handleConfirmPassword={this.handleConfirmPassword}
        onSubmit={this.onSubmit}
        isLoading={this.props.signup.isLoading}
        error={error}
      />
    );
  }
}

SignUpView.propTypes = {
  signUpUser: PropTypes.func.isRequired,
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
