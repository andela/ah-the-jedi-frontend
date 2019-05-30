import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/loginActions';
import LoginForm from '../components/auth/LoginForm';

class LoginView extends Component {
  state = {
    email: '',
    password: '',
  };

  /*
   *This function changes the state for for
   *email, password
   */
  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  /*
   *This function is fired when
   *a form is submitted
   *and interacts with the action loginUser
   *from props
   *
   */
  onSubmit = event => {
    event.preventDefault();
    const { loginUser, history } = this.props;
    loginUser(
      {
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      },
      history,
    );
  };

  render() {
    return (
      <LoginForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        email={this.state.email}
        isLoading={this.props.login.isLoading}
        password={this.state.password}
      />
    );
  }
}

export const mapDispatchToProps = () => ({
  loginUser,
});

export const mapStateToProps = state => ({
  login: state.LoginReducer,
  error: state.LoginReducer.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(LoginView);
