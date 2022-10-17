import React from 'react';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";
import { VenueGrid } from '../components/grids/VenuesGrid';


export function VenuesUserPage() {
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><VenueGrid user_id={user_id} token={token} username={username}/></>
}