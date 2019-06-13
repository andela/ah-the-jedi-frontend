import { toast } from 'react-toastify';

const jwtDecode = require('jwt-decode');

export const successToast = message => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
  });
};

export const errorToast = message => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
  });
};

export const isLoggedIn = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const isTokenExpired = () => {
  const userObject = localStorage.getItem('user');
  const { token } = JSON.parse(userObject);
  const decoded = jwtDecode(token);
  const expiryDate = decoded.exp * 1000;
  if (new Date(expiryDate) < new Date()) {
    return true;
  }
  return false;
};
