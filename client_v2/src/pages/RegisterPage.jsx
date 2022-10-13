import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import IncDecCounter from '../components/button_containers/IncDecCounter'
import Swal from 'sweetalert2'


export function RegisterPage() {

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    username:"",
                    email:"",
                    password:""

                }}
                onSubmit={async (values, actions) => {
                    try {
                        //const resp = await createEventRequest(values);
                        //actions.resetForm();
                        console.log(values);
                        navigate('/user',{
                            state: {
                              user_id: 4
                            }});
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input name="username"
                        type="text" 
                        placeholder="username"
                        onChange={props.handleChange}
                        value={props.username} required/>
                        <h3></h3>
                        <input name="email"
                        type="text" 
                        placeholder="email"
                        onChange={props.handleChange}
                        value={props.email} required/>
                        <h3></h3>
                        <input name="password"
                        type="password" 
                        placeholder="password"
                        onChange={props.handleChange}
                        value={props.password} required/>
                        <button type="submit">Register</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}