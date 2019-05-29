import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { resetPassword } from "../../redux/actions/resetPasswordAction";

require("../../assets/styles/reset_password.css");

class ResetPassword extends Component {
  state = {
    email: ""
  };

  onChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log(this.props)
    const { resetPassword } = this.props;
    resetPassword(this.state);
  };

  render() {
    const { ResetPassword } = this.props;
    console.log("Hii ndio props ", ResetPassword.message);
    if (ResetPassword.message) {
      if (ResetPassword.message.includes("404")) {
        console.log("test here", ResetPassword.message);
        document.getElementById("error").innerHTML = "Account with this email is not found.";
      } else {
        return (
          <div>
            <p>{ResetPassword.message}</p>
          </div>
        );
      }
    }
    return (
      <div className="box">
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <p id="error" />
            <label>Enter your email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email here"
              required
              onChange={this.onChange}
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  resetPassword
});

const mapStateToProps = state => ({
  ResetPassword: state.reset_password.message,
  // error: state.reset_password.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(ResetPassword);
