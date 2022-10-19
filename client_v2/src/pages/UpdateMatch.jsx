import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { CompetitrosList } from "../components/list/CompetitorsList";
import { VenueList } from "../components/list/VenuesList";
import { updateMatchRequest } from "../api/matches.api";
import Swal from 'sweetalert2'
import vs from "../components/styles/img/vs.svg"



export function UpdateMatch() {
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();
    const location = useLocation();

    const { user_id, token, username, sport, match } = location.state;

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
                    values.date = startDate.toISOString().substring(0, 10);
                    if (values.competitor1_id == values.competitor2_id) {
                        Swal.fire({
                            position: 'top-end',
                            title: "The competitors for the match has to be diferent",
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 3500
                        })
                        

                    } else if (values.competitor1_group == values.competitor2_group) {
                        Swal.fire({
                            position: 'top-end',
                            title: "The group has to be different for each competitor",
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 3500
                        })

                    } 
                    else {
                    try {

                        const resp = await updateMatchRequest(values, match.match_id);

                        Swal.fire('Match Updated succesfully')
                        navigate(-1)

                    } catch (error) {
                        console.log(error)

                    }
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
                        <br /><img src={vs}></img><br />
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
                        <DatePicker selected={new Date(match.date)} onChange={(startDate) => setStartDate(startDate)} />
                        {/* <input type="text" name="date"
                            onChange={props.handleChange} />
                        <h3></h3> */}
                        <label>Time</label><br />
                        <input type="text" name="time"
                            onChange={props.handleChange} />
                        <br /><br />
                        <button type="reset">Reset</button>
                        <button type="submit">Update</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}