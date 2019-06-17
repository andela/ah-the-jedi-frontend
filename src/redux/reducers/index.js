import { combineReducers } from 'redux';
import SignUpReducer from './SignUpReducer';
import LoginReducer from './loginReducer';
import resetPasswordReducer from './resetPasswordReducer';
import passwordConfirmReducer from './passwordConfirmReducer';
import profile from './profileReducer';
import SearchReducer from './SearchReducer';
import FetchArticlesReducer from './FetchArticlesReducer';
import CreateArticleReducer from './CreateArticleReducer';
import UpdateArticleReducer from './UpdateArticleReducer';
import CreateCommentReducer from './createCommentReducer';
import FetchCommentsReducer from './FetchCommentsReducer';
import bookmarkReducer from './bookmarkReducer';
import TagsReducer from './TagsReducer';

const rootReducer = combineReducers({
  signup: SignUpReducer,
  LoginReducer,
  reset_password: resetPasswordReducer,
  password_confirm: passwordConfirmReducer,
  profile,
  SearchReducer,
  FetchArticlesReducer,
  createArticle: CreateArticleReducer,
  updateArticle: UpdateArticleReducer,
  create_comment: CreateCommentReducer,
  FetchCommentsReducer,
  bookmarkReducer,
  TagsReducer,
});

export default rootReducer;
