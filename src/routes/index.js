<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

import Home from '../components/home/Home';
import SignUpView from '../views/SignUpView';
import LoginView from '../views/LoginView';
import Notfound from '../components/layout/Notfound';
import AccountActivatedView from '../views/AccountActivateView';
import EmailSentView from '../views/EmailSentView';
import ResetPassword from '../components/reset_password';

=======
=======
>>>>>>> 3ea94ba... feat(password-reset): implement password reset
=======
>>>>>>> 63de13b... feat(password-reset): implement password reset
import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Notfound from "../components/layout/Notfound";
import ResetPassword from "../components/reset_password";
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 1646809... feat(password-reset): implement password reset
=======
>>>>>>> 3ea94ba... feat(password-reset): implement password reset
=======
>>>>>>> 63de13b... feat(password-reset): implement password reset

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    id: "home"
<<<<<<< HEAD
<<<<<<< HEAD
  },
  {
<<<<<<< HEAD
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
    component: ResetPassword,
    id: 'reset_password',
  },
  {
    component: Notfound,
    id: 'notfound',
=======
    path: "/login",
    component: Login,
    id: "login"
  },
  {
    path: "/reset_password",
    component: ResetPassword,
    id: "reset_password"
>>>>>>> 1646809... feat(password-reset): implement password reset
  },
  {
=======
  },
  {
    path: "/login",
    component: Login,
    id: "login"
  },
  {
    path: "/reset_password",
    component: ResetPassword,
    id: "reset_password"
  },
  {
>>>>>>> 3ea94ba... feat(password-reset): implement password reset
=======
  },
  {
    path: "/login",
    component: Login,
    id: "login"
  },
  {
    path: "/reset_password",
    component: ResetPassword,
    id: "reset_password"
  },
  {
>>>>>>> 63de13b... feat(password-reset): implement password reset
    component: Notfound,
    id: "notfound"
  }
];

export default routes;
