import decode from 'jwt-decode';

export default class Authhelper {
  setToken = token => {
    localStorage.setItem('token', token);
  };

  isTokenExpired = token => {
    try {
      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (error) {
      return false;
    }
  };

  isLoggedIn = () => {
    const token = this.getToken();
    return !this.isTokenExpired(token) && !!token;
  };

  getToken = () => {
    return localStorage.getItem('token');
  };
}
