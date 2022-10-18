import React from 'react';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";
import { EventGrid } from '../components/grids/EventsGrid'; 


export function LandingUserPage() {
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><EventGrid user_id={user_id} token={token} username={username}/></>
}