import React, { useState } from "react";
import Select from 'react-select';
import { Form, Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from './SelectComponent.module.css';
import IncDecCounter from '../components/IncDecCounter'
/* import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
 */

const options = [
    { value: 'Football', label: 'Football' },
    { value: 'Basketball', label: 'Basketball' },
    { value: 'Baseball', label: 'Baseball' },
    { value: 'Archery', label: 'Archery' },
    { value: 'Paintball', label: 'Paintball' }
]

function CreateEvent() {
    return (
        <div className={styles.center}>
            <h1>Create an event</h1>
            <Formik
                initialValues={{
                    event_name: "",
                    description: "",
                    sport: "Sport",
                    wins: "",
                    losses: ""

                }}
                onSubmit={async (values, actions) => {
                    console.log(values);
                    try {
                        await createEventRequest(values);
                        actions.resetForm();
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
                            required/>
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        {/* <select name="sport" type="text"
                            onChange={props.handleChange}
                            value={props.values.sport}
                            required>
                            <option value="football">Football</option>
                            <option value="basketball">Basketball</option>
                            <option value="baseball">Baseball</option>
                            <option value="Archery">Archery</option>
                            <option value="Paintball">Paintball</option>
                        </select> */}
                        <Select className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} />
                        <h3></h3>
                        <label>Wins</label>
                        {/* <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={props.values.wins} 
                            required/> */}
                        < IncDecCounter />
                        <h3></h3>
                        <label>Losses</label>
                        {/* <input type="int" name="losses"
                            onChange={props.handleChange}
                            value={props.values.losses} 
                            required/> */}
                        < IncDecCounter />
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}

export default CreateEvent;