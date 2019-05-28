import Home from "../components/home/Home";
import Login from "../components/auth/Login";
import Notfound from "../components/layout/Notfound";
import ResetPassword from "../components/reset_password";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
    id: "home"
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
    component: Notfound,
    id: "notfound"
  }
];

export default routes;
