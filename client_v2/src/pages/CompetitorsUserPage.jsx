import React from 'react';
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'
import { useLocation } from "react-router-dom";
import { CompetitorsGrid } from '../components/grids/CompetitorsGrid';


export function CompetitorsUserPage() {
    const location = useLocation();
    const {user_id, token, username} = location.state;

    return <><ButtonUserContainer user_id={user_id} token={token} username={username}/><CompetitorsGrid user_id={user_id} token={token} username={username}/></>
}