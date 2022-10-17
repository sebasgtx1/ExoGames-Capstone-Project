import axios from 'axios';

const API = "http://localhost:4000/"

export const getCompetitorsRequest = async () => {
    return await axios.get(API + "competitors");
}

export const getCompetitorIdRequest = async (id) => {
    return await axios.get(API + "competitor/" + id);
}

export const getMyCompetitorsRequest = async (user_id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(API + "competitors/" + user_id);
}

export const getMyCompetitorIdRequest = async (user_id, id) => {
    return await axios.get(API + "my_competitor/" + user_id + "/" + id);
}

export const getCompetitorSport = async (sport) => {
    return await axios.get(API + "competitors_sport/" + sport);
}

export const createCompetitorRequest = async (competitor) => {
    return await axios.post(API + "create_competitor", competitor);
}

export const updateCompetitorRequest = async (params, id) => {
    return await axios.put(API + "update_competitor/" + id, params);
}

export const deleteCompetitorRequest = async (id) => {
    return await axios.put(API + "delete_competitor/" + id);
}