import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { getVenueIdRequest, updateVenueRequest } from "../api/venues.api";
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";

export function UpdateVenue() {
    const { id } = useParams();
    const [venue, setVenue] = useState([])
    const location = useLocation();
    const {user_id, token } = location.state;

    useEffect(() => {

        async function getEvent() {
            const resp = await getVenueIdRequest(id);
            setVenue(resp.data);

        }
        getEvent();
    }, [id])

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Update Venue</h1>
            <Formik
                initialValues={{
                    name: venue.name,
                    description: venue.description,

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await updateVenueRequest(values, id, token);
                        Swal.fire('Venue Updated succesfully');
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
                            placeholder="Venue name"
                            onChange={props.handleChange}
                            defaultValue={venue.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            defaultValue={venue.description} />
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Update</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}