import React, { Component } from 'react';
import { connect } from 'react-redux';
import { errorToast } from '../helpers/toastify';
import { passwordConfirm } from '../redux/actions/passwordConfirmAction';
import { PasswordConfirmForm } from '../components/auth/PasswordConfirmForm';

require('../assets/styles/reset_password.css');
require('../assets/styles/ReactToastify.css');

export class PasswordConfirmView extends Component {
  state = {
    password: '',
    confirmPassword: '',
    isError: false,
  };

  onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  handleConfirmPassword = (e) => {
    const { password } = this.state;
    this.setState({ confirmPassword: e.target.value });
    if (e.target.value !== password) {
      document.getElementById('myDiv').style.borderColor = 'red';
    } else {
      document.getElementById('myDiv').style.borderColor = 'green';
    }
  };

  handleSubmit = () => {
    const { passwordConfirm } = this.props;
    passwordConfirm(this.state);
  };

  onSubmit = (e) => {
    const { password, confirmPassword } = this.state;
    e.preventDefault();
    if (password === confirmPassword) {
      this.handleSubmit();
    } else {
      errorToast("Passwords don't match.");
    }
  };

  render() {
    return (
      <PasswordConfirmForm
        onChange={this.onChange}
        handleConfirmPassword={this.handleConfirmPassword}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapDispatchToProps = () => ({
  passwordConfirm,
});

const mapStateToProps = state => ({
  Password_Confirm: state.password_confirm,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(PasswordConfirmView);
