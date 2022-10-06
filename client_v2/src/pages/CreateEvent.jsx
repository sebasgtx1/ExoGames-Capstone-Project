import React from "react";
import { Form, Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'

function CreateEvent() {
    return (
        <div className={styles.center}>
            <h1>Create event</h1>
            <Formik
                initialValues={{
                    event_name: "",
                    description: "",
                    sport: "football",
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
                        <label>Event name</label>
                        <input type="text" name="event_name"
                            placeholder="write a name"
                            onChange={props.handleChange}
                            value={props.values.event_name} 
                            required/>
                        <h3></h3>
                        <label>Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="write a description for your event"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        <label>sport</label>
                        <select name="sport" type="text"
                            onChange={props.handleChange}
                            value={props.values.sport}>
                            <option value="football">football</option>
                            <option value="basketball">basketball</option>
                            <option value="baseball">baseball</option>
                            <option value="Archery">Archery</option>
                            <option value="Paintball">Paintball</option>
                        </select>
                        <h3></h3>
                        <label>Wins</label>
                        <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={props.values.wins} 
                            required/>
                        <h3></h3>
                        <label>Losses</label>
                        <input type="int" name="losses"
                            onChange={props.handleChange}
                            value={props.values.losses} 
                            required/>
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