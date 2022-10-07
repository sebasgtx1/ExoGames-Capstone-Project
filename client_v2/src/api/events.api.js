import axios from 'axios';

const API = "http://localhost:4000/"

export const getEventsRequest = async () => {
    return await axios.get(API);
}

export const getEventsIdRequest = async (id) => {
    return await axios.get(API + "event/" + id);
}

export const createEventRequest = async (event) => {
    return await axios.post(API + "create_event", event);
}

export const updateEventRequest = async (params, id) => {
    return await axios.post(API + "update_event/" + id, params);
}

export const deleteEventRequest = async (id) => {
    return await axios.post(API + "delete_event/" + id);
}

