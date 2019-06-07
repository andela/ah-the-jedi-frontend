import HomeView from '../components/home/Home';
import SignUpView from '../views/SignUpView';
import ReadArticle from '../components/articles/ReadArticle';
import LoginView from '../views/LoginView';
import Notfound from '../components/layout/Notfound';
import AccountActivatedView from '../views/AccountActivateView';
import EmailSentView from '../views/EmailSentView';
import ResetPasswordView from '../views/ResetPasswordView';
import PasswordConfirmView from '../views/PasswordConfirmView';
import ProfileView from '../components/profiles/Profile';
import SearchView from '../views/SearchView';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeView,
    id: 'home',
  },
  {
    path: '/api/users/activate',
    component: AccountActivatedView,
    id: 'signup',
  },
  {
    path: '/login',
    component: LoginView,
    id: 'login',
  },
  {
    path: '/signup',
    component: SignUpView,
    id: 'signup',
  },
  {
    path: '/emailsent',
    component: EmailSentView,
    id: 'emailsent',
  },
  {
    path: '/reset_password',
    component: ResetPasswordView,
    id: 'reset_password',
  },
  {
    path: '/password_confirm',
    component: PasswordConfirmView,
    id: 'password_confirm',
  },
  {
    path: '/@:username',
    component: ProfileView,
    id: 'profile',
  },
  {
    path: '/search',
    component: SearchView,
    id: 'search',
  },
  {
    path: '/articles/:slug',
    component: ReadArticle,
    id: 'readarticle',
  },
  {
    component: Notfound,
    id: 'notfound',
  },
];

export default routes;
