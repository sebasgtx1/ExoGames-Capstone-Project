import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import Swal from 'sweetalert2'
import { LoginRequest } from "../api/users.api";

export function LoginPage() {

    const navigate = useNavigate();

    const goRegister =()=>{
        navigate('/register')
    };
    return (
        <div className={styles.center}>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email:"",
                    password:""

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await LoginRequest(values);
                        const data = resp.data
                        navigate('/my_events',{
                            state: {
                              user_id: data.user_id,
                              username:data.username,
                              token: data.token
                            }});
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
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
                        <br /><br />
                        <button type="submit">Login</button>
                        <button onClick={goRegister}>Register</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}