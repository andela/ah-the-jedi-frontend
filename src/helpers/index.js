import { toast } from 'react-toastify';

export const displayMessage = message => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
  });
};
