import axios from 'axios';

const API = "http://157.230.84.201/"

export const createUserRequest = async (values) => {
    return await axios.post(API + 'create_user', values);
}

export const LoginRequest = async (values) => {
    return await axios.post(API + 'login', values);
}
