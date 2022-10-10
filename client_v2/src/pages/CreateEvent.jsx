import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import IncDecCounter from '../components/button_containers/IncDecCounter'
import Swal from 'sweetalert2'
/* import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
 */

const options = [
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Archery', label: 'Archery' },
    { value: 'Paintball', label: 'Paintball' }
]

export function CreateEvent() {

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    event_name: "",
                    description: "",
                    sport: "football",
                    image: "",
                    wins: "",
                    losses: ""

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await createEventRequest(values);
                        actions.resetForm();
                        Swal.fire('Event Created succesfully')
                        navigate('/create_match/' + resp.data.event_id,{
                            state: {
                              event_id: resp.data.event_id,
                              event_name: resp.data.event_name
                            }});
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
                            value={props.values.event_name}
                            required />
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
                            value={props.values.sport}
                            required>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="Archery">Archery</option>
                            <option value="Paintball">Paintball</option>
                        </select>
                        <h3></h3>
                        <h1>Upload an image</h1>
                        <h3></h3>
                        <input type="file" name="image"
                        onChange={props.handleChange}/>
                        {/*<Select className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} />*/}
                        <h1>Rules</h1>
                        <label>Wins</label>
                        <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={props.values.wins}
                            required />
                        {/*< IncDecCounter />*/}
                        <h3></h3>
                        <label>Losses</label>
                        <input type="int" name="losses"
                            onChange={props.handleChange}
                            value={props.values.losses}
                            required />
                        {/*< IncDecCounter />*/}
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Next</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}