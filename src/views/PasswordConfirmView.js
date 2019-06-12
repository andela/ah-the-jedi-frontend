import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { passwordConfirm } from '../redux/actions/passwordConfirmAction';
import { PasswordConfirmForm } from '../components/auth/PasswordConfirmForm';

require('../assets/styles/reset_password.css');
require('../assets/styles/ReactToastify.css');

export class PasswordConfirmView extends Component {
  state = {
    password: '',
    confirmPassword: '',
    isError: false,
    isInvalid: true,
  };

  onChange = e => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  handleConfirmPassword = e => {
    const { password } = this.state;
    this.setState({ confirmPassword: e.target.value });
    if (e.target.value !== password) {
      document.getElementById('myDiv').style.borderColor = 'red';
      document.getElementById('confirm-error').innerText = 'Ensure that both passwords match';
    } else {
      document.getElementById('myDiv').style.borderColor = 'green';
      document.getElementById('confirm-error').innerText = '';
      this.setState({ isInvalid: false });
    }
  };

  handleSubmit = () => {
    const { passwordConfirm: confirmPassword, history } = this.props;
    confirmPassword(this.state, history);
  };

  onSubmit = e => {
    e.preventDefault();
    this.handleSubmit();
  };

  render() {
    const {
      error,
      Password_Confirm: { isLoading },
    } = this.props;
    return (
      <PasswordConfirmForm
        onChange={this.onChange}
        handleConfirmPassword={this.handleConfirmPassword}
        onSubmit={this.onSubmit}
        error={error}
        state={this.state}
        isLoading={isLoading}
      />
    );
  }
}

PasswordConfirmView.propTypes = {
  passwordConfirm: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  history: PropTypes.shape({}),
  Password_Confirm: PropTypes.shape({}),
};

PasswordConfirmView.defaultProps = {
  error: {},
  history: {},
  Password_Confirm: { isLoading: {} },
};

const mapDispatchToProps = () => ({
  passwordConfirm,
});

const mapStateToProps = state => ({
  Password_Confirm: state.password_confirm,
  error: state.password_confirm.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(PasswordConfirmView);
