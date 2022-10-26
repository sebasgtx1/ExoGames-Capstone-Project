import axios from 'axios';

const API = "https://sea-lion-app-xw53b.ondigitalocean.app/"

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('upload', file);
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    };
    return await axios.post(API + "upload", formData, config);
}