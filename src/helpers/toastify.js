import { toast } from 'react-toastify';

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
