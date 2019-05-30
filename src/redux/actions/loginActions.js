import { LOGIN_USER } from '../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

export const loginUser = (data, history) => {
  // console.log(data)
  return dispatch => {
    dispatch({ type: LOGIN_USER });
    axios
      .post('http://127.0.0.1:8000/api/users/login/', data)
      .then(response => {
        // console.log('the data' + response.data.user.email);
        dispatch(loginSuccess(response.data));
        toast.success('Welcome', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true
        });
        history.push('/');
      })
      .catch(error => {
        // console.log('the error ' + error.response.data.errors.error[0]);
        dispatch(loginFailure(error));
      });
  };
};

export const loginSuccess = response => ({
  type: `${LOGIN_USER}_SUCCESS`,
  response
});

export const loginFailure = error => ({
  type: `${LOGIN_USER}_FAILURE`,
  error
});
