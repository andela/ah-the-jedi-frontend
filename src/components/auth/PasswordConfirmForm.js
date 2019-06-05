import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

require('../../assets/styles/reset_password.css');
require('../../assets/styles/ReactToastify.css');

export class PasswordConfirmForm extends Component {
  render() {
    const { onChange, handleConfirmPassword, onSubmit } = this.props;
    return (
      <div className="box">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <p id="error" />
            <Form.Label>Enter new password:</Form.Label>
            <Form.Control
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              onChange={onChange}
            />
            <Form.Text className="text-muted">
              Must be a strong password with alphanumeric characters.
            </Form.Text>
            <Form.Label>Confirm new password:</Form.Label>
            <Form.Control
              id="myDiv"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm password"
              required
              onChange={handleConfirmPassword}
            />
          </Form.Group>
          <div className="col-md-12 text-center">
            <Button variant="primary" type="submit" id="passButton">
              Submit
            </Button>
          </div>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

export default PasswordConfirmForm;
