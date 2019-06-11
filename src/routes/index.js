import HomeView from '../components/home/Home';
import SignUpView from '../views/SignUpView';
import LoginView from '../views/LoginView';
import Notfound from '../components/layout/Notfound';
import AccountActivatedView from '../views/AccountActivateView';
import EmailSentView from '../views/EmailSentView';
import ResetPasswordView from '../views/ResetPasswordView';
import PasswordConfirmView from '../views/PasswordConfirmView';
import ProfileView from '../components/profiles/Profile';
import CreateArticleView from '../views/CreateArticleView';
import UpdateArticleView from '../views/UpdateArticleView';

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
    path: '/create',
    component: CreateArticleView,
    id: 'create',
  },
  {
    path: '/update/:slug',
    component: UpdateArticleView,
    id: 'update',
  },
  {
    component: Notfound,
    id: 'notfound',
  },
];

export default routes;
