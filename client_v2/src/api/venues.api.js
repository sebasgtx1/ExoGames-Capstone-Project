import axios from 'axios';

const API = "http://localhost:4000/"

export const getVenuesRequest = async () => {
    return await axios.get(API + "venues");
}

export const getVenueIdRequest = async (id) => {
    return await axios.get(API + "venue/" + id);
}

export const getMyVenuesRequest = async (user_id) => {
    return await axios.get(API + "venues/" + user_id);
}
export const getMyVenueIdRequest = async (user_id, id) => {
    return await axios.get(API + "venue/" + user_id + "/" + id);
}

export const createVenueRequest = async (venue) => {
    return await axios.post(API + "create_venue", venue);
}

export const updateVenueRequest = async (params, id) => {
    return await axios.put(API + "update_venue/" + id, params);
}

export const deleteVenueRequest = async (id) => {
    return await axios.delete(API + "delete_venue/" + id);
}
