import Home from '../components/home/Home';
import Login from '../components/auth/Login';
import Notfound from '../components/layout/Notfound';
import ResetPasswordView from '../views/ResetPasswordView';
import PasswordConfirmView from '../views/PasswordConfirmView';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    id: 'home',
  },
  {
    path: '/login',
    component: Login,
    id: 'login',
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
    component: Notfound,
    id: 'notfound',
  },
  {
    component: Notfound,
    id: 'notfound',
  },
];

export default routes;
