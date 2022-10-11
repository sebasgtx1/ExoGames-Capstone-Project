import React, { useState } from "react";
import { Form, Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { createVenueRequest } from "../api/venues.api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'


export function CreateVenue() {
    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Create Venue</h1>
            <Formik
                initialValues={{
                    name: "",
                    description: ""

                }}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    try {
                        await createVenueRequest(values);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_venues')

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
                            value={props.values.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>


                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}
