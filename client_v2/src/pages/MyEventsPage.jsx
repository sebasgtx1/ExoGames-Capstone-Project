import React from 'react';
import { MyEventsGrid } from '../components/grids/MyEventsGrid';

export function MyEventsPage(props) {

    return <MyEventsGrid user_id={props.user_id}/>
}