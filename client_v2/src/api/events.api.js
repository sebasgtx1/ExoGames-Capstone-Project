import axios from 'axios';

const API = "http://localhost:4000/"

export const getEventsRequest = async () => {
    return await axios.get(API);
}

export const getEventsIdRequest = async (id) => {
    return await axios.get(API + "event/" + id);
}

export const getMyEventsRequest = async (user_id) => {
    return await axios.get(API + "events/" + user_id);
}

export const getMyEventIdRequest = async (user_id, id) => {
    return await axios.get(API + "event/" + user_id + "/" + id);
}

export const createEventRequest = async (event) => {
    return await axios.post(API + "create_event", event);
}

export const updateEventRequest = async (params, id) => {
    return await axios.put(API + "update_event/" + id, params);
}

export const deleteEventRequest = async (id) => {
    return await axios.put(API + "delete_event/" + id);
}

export const PublishEventRequest = async (id, status) => {
    return await axios.put(API + "publish/" + id, status);
}



