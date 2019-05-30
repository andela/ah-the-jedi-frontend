import { toast } from 'react-toastify';

export const displayMessage = message => {
  console.log('CLICKED');
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
  });
};
