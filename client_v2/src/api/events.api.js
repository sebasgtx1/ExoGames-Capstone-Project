import axios from 'axios';

const API = "http://localhost:4000/"



export const getEventsRequest = async () => {
    return await axios.get(API);
}

export const getEventsIdRequest = async (id) => {
    return await axios.get(API + "event/" + id);
}

export const getMyEventsRequest = async (user_id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.get(API + "events/" + user_id, config);
}

export const getMyEventIdRequest = async (user_id, id) => {
    return await axios.get(API + "my_event/" + user_id + "/" + id);
}

export const createEventRequest = async (event, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(API + "create_event", event, config);
}

export const updateEventRequest = async (params, id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.put(API + "update_event/" + id, params, config);
}

export const deleteEventRequest = async (id, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.put(API + "delete_event/" + id, config);
}

export const PublishEventRequest = async (id, status, token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    return await axios.put(API + "publish/" + id, status, config);
}



