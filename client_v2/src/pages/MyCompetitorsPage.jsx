import React from 'react';
import { MyCompetitorsGrid } from '../components/grids/MyCompetitorsGrid';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";

export function MyCompetitorsPage() {
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><MyCompetitorsGrid user_id={user_id} token={token} username={username}/></>
}