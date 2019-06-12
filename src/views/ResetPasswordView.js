import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../redux/actions/resetPasswordAction';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';

require('../assets/styles/reset_password.css');

export class ResetPasswordView extends Component {
  state = {
    email: '',
  };

  onChange = e => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { resetPassword: passwordReset } = this.props;
    passwordReset(this.state);
  };

  render() {
    const {
      error,
      ResetPassword: { isLoading },
    } = this.props;
    return (
      <ResetPasswordForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        error={error}
        isLoading={isLoading}
      />
    );
  }
}

ResetPasswordView.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  ResetPassword: PropTypes.shape({}),
  error: PropTypes.shape({}),
};

ResetPasswordView.defaultProps = {
  error: {},
  ResetPassword: { isLoading: {} },
};

const mapDispatchToProps = () => ({
  resetPassword,
});

const mapStateToProps = state => ({
  ResetPassword: state.reset_password,
  error: state.reset_password.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(ResetPasswordView);
