import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import LoginReducer from './loginReducer';
import resetPasswordReducer from './resetPasswordReducer';
import passwordConfirmReducer from './passwordConfirmReducer';
import profile from './profileReducer';
import CreateArticleReducer from '../reducers/CreateArticleReducer';
import UpdateArticleReducer from '../reducers/UpdateArticleReducer';

const rootReducer = combineReducers({
  signup: SignUpReducer,
  LoginReducer,
  reset_password: resetPasswordReducer,
  password_confirm: passwordConfirmReducer,
  profile,
  createArticle: CreateArticleReducer,
  updateArticle: UpdateArticleReducer,
});

export default rootReducer;
