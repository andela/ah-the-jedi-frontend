import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { passwordConfirm } from '../../redux/actions/passwordConfirmAction';
import { ToastContainer, toast } from 'react-toastify';

require('../../assets/styles/reset_password.css');
require('../../assets/styles/ReactToastify.css');

class PasswordConfirm extends Component {
  state = {
    password: '',
    passwordConfirm: '',
    isError: false
  };

  notify = () => toast(
    "Password reset successfully"
  );

  onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState({ [name]: value });
  };

  handleConfirmPassword = (e) => {
    if (e.target.value !== this.state.password) {
      console.log('wrong');
      document.getElementById('myDiv').style.borderColor = 'red';
    } else {
      console.log('great');
      document.getElementById('myDiv').style.borderColor = 'green';
      this.setState({ passwordConfirm: e.target.value });
    }
  };

  handleSubmit = () => {
    const { passwordConfirm } = this.props;
    passwordConfirm(this.state) 
    .then(res => {
        this.notify()
    })
    console.log('>>>>>>>>>>>>>', this.props);
  };

  onSubmit = (e) => {
    document.getElementById('error').innerHTML = '';
    e.preventDefault();
    if (this.state.password == this.state.passwordConfirm) {
      this.handleSubmit();
      console.log('submitting form');
    } else {
      document.getElementById('error').innerHTML = "Passwords don't match.";
    }
  };

  render() {
    const { Password_Confirm } = this.props;
    const errorMessage = 'A password should be only Aplhanumeric characters and a minimum of 8 characters';
    // debugger;
    if (Password_Confirm.isError) {
        document.getElementById('error').innerHTML = errorMessage;
    //   }
    }
    // else {
    //     <ToastContainer />
    //     this.notify();
    // }

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
              onChange={this.onChange}
            />
            <label>Confirm new password:</label>
            <input
              id="myDiv"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              required
              onChange={this.handleConfirmPassword}
            />
          </Form.Field>
          <Button>Submit</Button>
        </Form>
        <ToastContainer />
      </div>
    );
  }
}

const mapDispatchToProps = () => ({
  passwordConfirm,
});

const mapStateToProps = state => ({
  Password_Confirm: state.password_confirm,
  // error: state.reset_password.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(PasswordConfirm);
