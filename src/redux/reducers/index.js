import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';

const rootReducer = combineReducers({
  signup: SignUpReducer,
});

export default rootReducer;
