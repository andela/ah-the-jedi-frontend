import React, { Component } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';

import displayError from '../../helpers/inputerror';
import '../../assets/styles/common.scss';

require('../../assets/styles/reset_password.css');

/*
 * ResetPasswordForm Component
 *
 *@return {jsx}
 */

export class ResetPasswordForm extends Component {
  render() {
    const {
      onSubmit, onChange, error, isLoading,
    } = this.props;
    return (
      <div className="box">
        <Form className="box-form" onSubmit={onSubmit}>
          <Form.Group>
            <p id="error" />
            <Form.Label>Enter your email:</Form.Label>
            <Form.Control
              isInvalid={!!(error && error.data && error.data)}
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email"
              required
              onChange={onChange}
            />
            <Form.Control.Feedback id="email-error" type="invalid">
              {error && error.data && error.data.message && 'User with this email not found.'}
              {error && error.data && error.data.message ? displayError('email-error') : ''}
            </Form.Control.Feedback>
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

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.shape({}),
};

ResetPasswordForm.defaultProps = {
  error: {},
};
export default ResetPasswordForm;
