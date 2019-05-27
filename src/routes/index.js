import Home from '../components/home/Home';
import Login from '../components/auth/Login';
import Notfound from '../components/layout/Notfound';

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
    component: Notfound,
    id: 'notfound',
  },
];

export default routes;
