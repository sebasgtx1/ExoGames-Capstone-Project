import React from 'react';
import { MyEventsGrid } from '../components/grids/MyEventsGrid';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";

export function MyEventsPage() {
    
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><MyEventsGrid user_id={user_id} token={token} username={username}/></>
}