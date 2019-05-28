import React, { Component } from "react";

import { Button, Checkbox, Form, Card, Icon, Image } from "semantic-ui-react";

require("./reset_password.css");

class ResetPassword extends React.Component {
  render() {
    return (
      <div className="box">
        <Form>
          <Form.Field>
            <label>Enter your email:</label>
            <input type="email" placeholder="Email here" required />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default ResetPassword;
