import React, { useState } from "react";
import Select from 'react-select';
import { Form, Formik } from 'formik';
import { createCompetitorRequest } from "../api/competitors.api";
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import IncDecCounter from '../components/button_containers/IncDecCounter'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export function CreateCompetitor() {
    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Create competitor</h1>
            <Formik
                initialValues={{
                    name: "",
                    team_players: "",
                    description: "",
                    sport: "football"

                }}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    try {
                        await createCompetitorRequest(values);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_competitors')
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input type="text" name="name"
                            placeholder="Competitor Name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="team_players"
                            rows="3"
                            placeholder="Team Players"
                            onChange={props.handleChange}
                            value={props.values.team_players} />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        <select name="sport" type="text"
                            onChange={props.handleChange}
                            defaultValue={props.values.sport}
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