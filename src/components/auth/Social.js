import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';
import { UserSocialLogin } from '../../redux/actions/loginActions';
import { errorToast } from '../../helpers';
import '../../assets/styles/social.scss';

class SocialLogin extends Component {
  state = {
    isClicked: false,
  };

  /*
   * componentClicked:
   * changes state to avoid double button click
   */
  componentClicked = () => {
    this.setState({
      isClicked: true,
    });
  };

  /*
   * responseFacebook:
   * gets response from Facebook and calls login reducer
   */
  responseFacebook = response => {
    this.setState({
      isClicked: true,
    });
    const { UserSocialLogin, history } = this.props;
    UserSocialLogin({ provider: 'facebook', access_token: response.accessToken }, history);
  };

  /*
   * googleResponse:
   * gets response from Google and calls login reducer
   */
  googleResponse = response => {
    this.setState({
      isClicked: true,
    });
    const { UserSocialLogin, history } = this.props;
    UserSocialLogin({ provider: 'google-oauth2', access_token: response.accessToken }, history);
  };

  /*
   * onFailure:
   * Displays error message in case of failure
   */
  onFailure = () => {
    errorToast('Oops! something went wrong, please try again');
  };

  render() {
    return (
      <div data-set="SocialLoginDiv" className="sld">
        <FacebookLogin
          appId="409869986516596"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onClick={this.componentClicked}
          isDisabled={this.state.isClicked}
          render={renderProps => (
            <button
              className="loginBtn loginBtn--facebook"
              id="facebookLogin"
              onClick={renderProps.onClick}
            >
              Login with Facebook
            </button>
          )}
        />

        <GoogleLogin
          clientId="857285911538-6jchs8qlak94ek13roke22h2vncbvn5a.apps.googleusercontent.com"
          render={renderProps => (
            <button
              className="loginBtn loginBtn--google"
              id="googleLogin"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login with Google
            </button>
          )}
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
          disabled={this.state.isClicked}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  myState: state,
});

const mapDispatchToProps = () => ({
  UserSocialLogin,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(withRouter(SocialLogin));
