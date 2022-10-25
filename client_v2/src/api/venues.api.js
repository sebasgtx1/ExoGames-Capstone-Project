import axios from 'axios';

const API = "http://157.230.84.201/"

export const getVenuesRequest = async () => {
    return await axios.get(API + "venues");
}

export const getVenueIdRequest = async (id) => {
    return await axios.get(API + "venue/" + id);
}

export const getMyVenuesRequest = async (user_id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(API + "venues/" + user_id, config);
}
export const getMyVenueIdRequest = async (user_id, id) => {
    return await axios.get(API + "my_venue/" + user_id + "/" + id);
}

export const createVenueRequest = async (venue, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(API + "create_venue", venue, config);
}

export const updateVenueRequest = async (params, id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.put(API + "update_venue/" + id, params, config);
}

export const deleteVenueRequest = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.put(API + "delete_venue/" + id, config);
}
