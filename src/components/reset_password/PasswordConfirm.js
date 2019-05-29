import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";

require("../../assets/styles/reset_password.css");

class PasswordConfirm extends Component {
  state = {
    password: "",
    passwordConfirm: "",
  };

  render() {
    return (
      <div className="box">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <p id="error" />
            <label>Enter new password:</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
            <label>Confirm new password:</label>
            <input
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              required
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

export default PasswordConfirm;
