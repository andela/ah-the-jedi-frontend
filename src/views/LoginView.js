import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { loginUser: userLogin, history } = this.props;

    const { email, password } = this.state;
    userLogin(
      {
        user: {
          email,
          password,
        },
      },
      history,
    );
  };

  render() {
    const {
      error,
      login: { isLoading },
    } = this.props;
    const { email, password } = this.state;
    return (
      <LoginForm
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        email={email}
        isLoading={isLoading}
        password={password}
        error={error}
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

LoginView.propTypes = {
  loginUser: PropTypes.func.isRequired,
  login: PropTypes.shape({}),
  error: PropTypes.shape({}),
  history: PropTypes.shape({}),
};

LoginView.defaultProps = {
  history: {},
  error: {},
  login: { isLoading: false },
};

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(LoginView);
