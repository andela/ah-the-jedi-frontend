import Home from '../components/home/Home';
import LoginView from '../views/LoginView';
import Notfound from '../components/layout/Notfound';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    id: 'home'
  },
  {
    path: '/login',
    component: LoginView,
    id: 'login'
  },
  {
    component: Notfound,
    id: 'notfound'
  }
];

export default routes;
