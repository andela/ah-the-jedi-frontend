import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../redux/actions/resetPasswordAction';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';

require('../assets/styles/reset_password.css');

export class ResetPasswordView extends Component {
  state = {
    email: '',
  };

  onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { resetPassword } = this.props;
    resetPassword(this.state);
  };

  render() {
    return <ResetPasswordForm onChange={this.onChange} onSubmit={this.onSubmit} />;
  }
}

const mapDispatchToProps = () => ({
  resetPassword,
});

const mapStateToProps = state => ({
  ResetPassword: state.reset_password.message,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(ResetPasswordView);
