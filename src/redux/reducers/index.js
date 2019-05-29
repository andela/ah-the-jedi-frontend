import { combineReducers } from 'redux';
import resetPasswordReducer from './resetPasswordReducer';

const rootReducer = combineReducers ({
  reset_password: resetPasswordReducer,
});

export default rootReducer;
