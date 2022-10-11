import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { CompetitrosList } from "../components/list/CompetitorsList";
import { VenueList } from "../components/list/VenuesList";
import { updateMatchRequest } from "../api/matches.api";
import Swal from 'sweetalert2'



export function UpdateMatch(props) {
    const navigate = useNavigate();
    const location = useLocation();


    const match = location.state.match;
    return (
        <div className={styles.center}>
            <h1>Update match </h1>
            <Formik
                initialValues={{
                    competitor1_id: match.competitor1_id,
                    competitor2_id: match.competitor2_id,
                    event_id: match.event_id,
                    venue_id: match.venue_id,
                    competitor1_group: match.competitor1_group,
                    competitor2_group: match.competitor2_group,
                    date: match.date,
                    time: match.time

                }}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    try {

                        const resp = await updateMatchRequest(values, match.match_id);

                        Swal.fire('Match Updated succesfully')
                        navigate(-1)

                    } catch (error) {
                        console.log(error)

                    }

                }}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <label>competitor 1</label>

                        <CompetitrosList name="competitor1_id"
                            onChange={props.handleChange}

                        />
                        <select name="competitor1_group"
                            onChange={props.handleChange} required>
                            <option>Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <h3></h3>

                        <label>competitor 2</label>
                        <CompetitrosList
                            name="competitor2_id"
                            onChange={props.handleChange} />
                        <select name="competitor2_group"
                            onChange={props.handleChange} required>
                            <option >Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <h3></h3>
                        <label>Venue</label>
                        <VenueList
                            name="venue_id"
                            onChange={props.handleChange} />
                        <h3></h3>

                        <h3></h3>
                        <label>Date</label>
                        <input type="text" name="date"
                            onChange={props.handleChange} />
                        <h3></h3>
                        <label>Time</label>
                        <input type="text" name="time"
                            onChange={props.handleChange} />
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Update</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}