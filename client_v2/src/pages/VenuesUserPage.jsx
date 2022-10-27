import React from 'react';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";
import { VenueGrid } from '../components/grids/VenuesGrid';


export function VenuesUserPage() {
    const location = useLocation();
    let { user_id, token, username } = {};


    if (!(location.state)) {
        user_id = window.localStorage.getItem("user_id");
        token = window.localStorage.getItem("token");
        username = window.localStorage.getItem("username");
        

    }
    else {
        user_id = location.state.user_id;
        token = location.state.token;
        username = location.state.username;
    }

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><VenueGrid user_id={user_id} token={token} username={username}/></>
}