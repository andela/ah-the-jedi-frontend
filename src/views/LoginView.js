import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/loginActions';
import LoginForm from '../components/auth/Login';

class LoginView extends Component {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { loginUser, history } = this.props;
    loginUser(
      {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      },
      history
    );
  };

  render() {
    return (
      <LoginForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        email={this.state.email}
        password={this.state.password}
      />
    );
  }
}

const mapDispatchToProps = () => ({
  loginUser
});

const mapStateToProps = state => ({
  login: state.LoginReducer,
  error: state.LoginReducer.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(LoginView);
