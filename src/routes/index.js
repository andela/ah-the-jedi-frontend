import Home from '../components/home/Home';
import Login from '../components/auth/Login';
import Notfound from '../components/layout/Notfound';
import ResetPassword from '../components/reset_password/ResetPassword';
import PasswordConfirm from '../components/reset_password/PasswordConfirm';

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
    component: ResetPassword,
    id: 'reset_password',
  },
  {
    path: '/password_confirm',
    component: PasswordConfirm,
    id: 'password_confirm',
  },
  {
    component: Notfound,
    id: 'notfound',
  },
];

export default routes;
