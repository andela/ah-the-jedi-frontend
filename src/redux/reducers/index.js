import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import LoginReducer from './loginReducer';

const rootReducer = combineReducers({
  signup: SignUpReducer,
  LoginReducer,
});

export default rootReducer;
