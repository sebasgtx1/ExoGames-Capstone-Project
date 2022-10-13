import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { Formik } from 'formik';
import { getEventsIdRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { updateEventRequest } from "../api/events.api";
import Swal from 'sweetalert2'

export function UpdateEventCreation() {
    const location = useLocation();
    const navigate = useNavigate();
    const event_id = location.state.event_id;
    const [event, setEvents] = useState([])

    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(event_id);
            setEvents(resp.data);

        }
        getEvent();
    }, [event_id])



    return (
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    event_name: event.event_name,
                    description: event.description,
                    sport: event.sport,
                    wins: event.wins,
                    losses: event.losses

                }
                }

                onSubmit={async (values, actions) => {
                    try {

                        try {
                            const check = values.map((item) => {
                            console.log(item);
                            if (typeof item == 'undefined') {
                                
                                navigate(-1)
                            }
                        })} catch {
                            navigate(-1)
                        }

                        const resp = await updateEventRequest(values, event_id);
                        

                        navigate('/create_match/' + event_id, {
                            state: {
                                event_id: event_id,
                                event_name: values.event_name,
                                sport: values.sport
                            }
                        });

                        
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input type="text" name="event_name"
                            placeholder="Event Name"

                            onChange={props.handleChange}
                            defaultValue={event.event_name}

                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"

                            onChange={props.handleChange}
                            defaultValue={event.description}
                        />
                        <h3></h3>
                        <select name="sport" type="text"
                            onChange={props.handleChange}
                            defaultValue={event.sport}

                            required>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="Archery">Archery</option>
                            <option value="Paintball">Paintball</option>
                        </select>

                        <h3></h3>
                        <label>Wins</label>
                        <input type="int" name="wins"

                            onChange={props.handleChange}
                            defaultValue={event.wins}


                            required />

                        <h3></h3>
                        <label>Losses</label>
                        <input type="int" name="losses"
                            defaultValue={event.losses}
                            onChange={props.handleChange}

                            required />

                        <h3></h3>
                        <button type="reset" >Reset</button>

                        <button type="submit">Next</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}