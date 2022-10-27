import axios from 'axios';

const API = "https://sea-lion-app-xw53b.ondigitalocean.app/"

export const createUserRequest = async (values) => {
    return await axios.post(API + 'create_user', values);
}

export const LoginRequest = async (values) => {
    return await axios.post(API + 'login', values);
}
