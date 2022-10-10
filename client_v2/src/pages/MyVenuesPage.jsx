import React from 'react';
import { MyVenuesGrid } from '../components/grids/MyVenuesGrid';

export function MyVenuesPage(props) {

    return <MyVenuesGrid user_id={props.user_id}/>
}