import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Button, Form, Label } from 'semantic-ui-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { signUpUser } from '../redux/actions/SignUpAction';
import SignupForm from '../components/auth/Signup';
// eslint-disable-next-line import/no-unresolved

class SignUpView extends Component {
  state = {
    email: '',
    username: '',
    bio: '',
    password: '',
    comfirm_password: '',
  };

  onChange = event => {
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.password === this.state.comfirm_password) {
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

  handleConfirmPassword = e => {
    if (e.target.value !== this.state.password) {
      document.getElementById('match').style.borderColor = 'red';
    } else {
      document.getElementById('match').style.borderColor = 'green';
      this.setState({ comfirm_password: e.target.value });
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(SignUpView);
