import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import displayError from '../../helpers/inputerror';
import '../../assets/styles/common.scss';

require('../../assets/styles/reset_password.css');
require('../../assets/styles/ReactToastify.css');

/*
 * PasswordConfirmForm Component
 *
 *@return {jsx}
 */

export class PasswordConfirmForm extends Component {
  render() {
    const {
      onChange,
      error,
      state: { isInvalid, confirmPassword },
      handleConfirmPassword,
      onSubmit,
      isLoading,
    } = this.props;

    return (
      <div className="box">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <p id="error" />
            <Form.Label>Enter new password:</Form.Label>
            <Form.Control
              isInvalid={!!(error && error.data && error.data)}
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={onChange}
            />
            <Form.Control.Feedback id="password-error" type="invalid">
              {error && error.data && error.data.user && error.data.user.error}
              {error && error.data && error.data.user && error.data.user.error
                ? displayError('password-error')
                : ''}

              {error && error.data && error.data.errors
                ? 'Kindly resend password change request again'
                : ''}

              {error && error.data && error.data.errors ? displayError('password-error') : ''}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Must be a strong password with alphanumeric characters.
            </Form.Text>
            <Form.Label>Confirm new password:</Form.Label>
            <Form.Control
              isInvalid={!!confirmPassword && isInvalid}
              id="myDiv"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              required
              onChange={handleConfirmPassword}
            />
            <Form.Control.Feedback id="confirm-error" type="invalid" />
          </Form.Group>
          <div className="col-md-12 text-center">
            <Button variant="primary" className="box-form-button" type="submit">
              {isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  id="loading-btn"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                ''
              )}

              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

PasswordConfirmForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleConfirmPassword: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
  state: PropTypes.shape({}),
};

PasswordConfirmForm.defaultProps = {
  error: {},
  state: { isInvalid: true, confirmPassword: '' },
};

export default PasswordConfirmForm;
