import React from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import Swal from 'sweetalert2'
import { createUserRequest } from "../api/users.api";


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
                        const resp = await createUserRequest(values);
                        console.log(resp.data);
                        Swal.fire('Your Account has been created')
                        navigate('/login');
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