import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import LoginReducer from './loginReducer';
import resetPasswordReducer from './resetPasswordReducer';
import passwordConfirmReducer from './passwordConfirmReducer';

const rootReducer = combineReducers({
  signup: SignUpReducer,
  LoginReducer,
  reset_password: resetPasswordReducer,
  password_confirm: passwordConfirmReducer,
});

export default rootReducer;
