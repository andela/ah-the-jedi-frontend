import { combineReducers } from 'redux';
import resetPasswordReducer from './resetPasswordReducer';
import passwordConfirmReducer from './passwordConfirmReducer';

const rootReducer = combineReducers ({
  reset_password: resetPasswordReducer,
  password_confirm: passwordConfirmReducer,
});

export default rootReducer;
