
import axios from 'axios';

const uploadImageCallBack = (file) => {
    try {
        const url = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/do8v0ew77/image/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'sobu9leq');
        return axios.post(url, formData);
    }
    catch (err) {
        return err;
    }
}

export default uploadImageCallBack;
