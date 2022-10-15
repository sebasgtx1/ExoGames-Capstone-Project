import axios from 'axios';

const API = "http://localhost:4000/"

export const createUserRequest = async (values) => {
    return await axios.post(API + 'create_user', values);
}