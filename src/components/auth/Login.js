import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Card, Grid, Image } from 'semantic-ui-react';
import { loginUser } from '../../redux/actions/LoginActions';
import '../../assets/styles/login.scss';
import { toast } from 'react-toastify';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false
  };

  onChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onSubmit = event => {
    console.log(this.state);
    // console.log(this.props);
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

  componentWillReceiveProps(nextProps) {
    // console.log('next', nextProps);
    const { errors } = nextProps.error;
    if (errors && errors.error) {
      console.log(errors.error);

      toast.error(errors.error[0], {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        hideProgressBar: true,
        pauseOnHover: true
      });
    }
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form onSubmit={this.onSubmit}>
            <Form.Field>
              <label id="test">Email</label>
              <input
                placeholder="email"
                id="email"
                type="email"
                onChange={this.onChange}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder="password"
                id="password"
                onChange={this.onChange}
                type="Password"
                required
              />
            </Form.Field>
            <Button
              disabled={
                !this.state.email.match(
                  /^[a-zA-z0-9_.]+@[a-zA-z0-9-]+\.[a-z]+$/
                ) || !this.state.password.match(/^[a-zA-Z0-9]{8,}$/)
              }
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    );
  }
}

const mapDispatchToProps = () => ({
  loginUser
});

const mapStateToProps = state => ({
  login: state.loginUser,
  error: state.LoginReducer.error
});

export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(Login);
