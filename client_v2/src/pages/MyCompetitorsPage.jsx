import React from 'react';
import { MyCompetitorsGrid } from '../components/grids/MyCompetitorsGrid';

export function MyCompetitorsPage(props) {

    return <MyCompetitorsGrid user_id={props.user_id}/>
}