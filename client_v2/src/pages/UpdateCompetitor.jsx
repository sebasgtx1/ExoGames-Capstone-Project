import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { getCompetitorIdRequest, updateCompetitorRequest } from "../api/competitors.api";
import Swal from 'sweetalert2'

export function UpdateCompetitor() {
    const { id } = useParams();
    console.log(id);
    const [competitor, setCompetitor] = useState([])

    useEffect(() => {

        async function getVenue() {
            const resp = await getCompetitorIdRequest(id);
            setCompetitor(resp.data);

        }
        getVenue();
    }, [id])

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Update competitor</h1>
            <Formik
                initialValues={{
                    competitor_id: id,
                    name: competitor.name,
                    team_players: competitor.team_players,
                    description: competitor.description,
                    sport: competitor.sport

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await updateCompetitorRequest(values, id);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate(-1)
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>

                        <input type="text" name="name"
                            placeholder="competitor name"
                            onChange={props.handleChange}
                            defaultValue={competitor.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="team_players"
                            rows="3"
                            placeholder="team players"
                            onChange={props.handleChange}
                            defaultValue={competitor.team_players} />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={competitor.description} />
                        <h3></h3>
                        <select name="sport" type="text"
                            onChange={props.handleChange}
                            defaultValue={competitor.sport}
                            required>
                            <option>Select sport</option>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="Archery">Archery</option>
                            <option value="Paintball">Paintball</option>
                        </select>
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>



                    </form>
                )}
            </Formik>
        </div>
    );
}