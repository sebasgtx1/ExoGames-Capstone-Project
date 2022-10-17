import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { CompetitrosList } from "../components/list/CompetitorsList";
import { useLocation } from "react-router-dom";
import { VenueList } from "../components/list/VenuesList";
import { createMatchRequest } from "../api/matches.api";
import Swal from 'sweetalert2'


export function CreateMatch() {
    const location = useLocation();
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const { event_id, sport, user_id, token, username, addMatch } = location.state;

    function handleClick() {

        navigate('/my_events', {
            state: {
                user_id: user_id,
                token: token,
                username: username
            }
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
    function BackClick() {

        navigate('/update_create_event/' + event_id, {
            state: {
                event_id: event_id,
                user_id: user_id,
                token: token,
                username: username

            }
        })
    }

    let button = <button onClick={BackClick} >Back</button>
    if (addMatch) {
        button = null;
        
    }

    

    return (
        <div className={styles.center}>
            <h1>Create match</h1>
            <Formik
                initialValues={{
                    competitor1_id: "",
                    competitor2_id: "",
                    event_id: event_id,
                    venue_id: "",
                    competitor1_group: "",
                    competitor2_group: "",
                    date: "",
                    time: "",
                    token: token

                }}
                onSubmit={async (values, actions) => {
                    values.date = startDate.toISOString().substring(0, 10);
                    console.log(values.date);
                    try {
                        const resp = await createMatchRequest(event_id, values);
                        Swal.fire('Match Created succesfully').then(() => {
                            window.location.reload(false);
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        {/* <label>competitor 1</label> */}

                        <CompetitrosList 
                            name="competitor1_id" 
                            sport={sport}
                            onChange={props.handleChange}
                        />
                        
                        {/* <label>competitor 2</label> */}
                        <CompetitrosList
                            name="competitor2_id"
                            sport={sport}
                            onChange={props.handleChange} />
                        <br /><br />
                        <select name="competitor1_group"
                            onChange={props.handleChange} required>
                            <option>Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <select name="competitor2_group"
                            onChange={props.handleChange} required>
                            <option >Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <br /><br />
                        <VenueList
                            name="venue_id"
                            onChange={props.handleChange} />
                        <br /><br />
                        
                        <label>Date</label>
                        <DatePicker selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
                        {/* <input type="text" name="date"
                            onChange={props.handleChange} />
                        <h3></h3> */}
                        <label>Time</label><br />
                        <input type="text" name="time"
                            onChange={props.handleChange} />
                        <h3></h3>

                        {button}
                        <button type="submit">Submit</button>
                        <button onClick={handleClick}>Finish</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}