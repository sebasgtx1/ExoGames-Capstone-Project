import React from 'react';
import { MyVenuesGrid } from '../components/grids/MyVenuesGrid';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";

export function MyVenuesPage() {
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><MyVenuesGrid user_id={user_id} token={token} username={username}/></>
}