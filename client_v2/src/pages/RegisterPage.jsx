import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import Swal from 'sweetalert2'
import { createUserRequest } from "../api/users.api";


export function RegisterPage() {
    const regex_username = new RegExp('^(?=.{6,12}$)');
    const regex_email = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
    const regex_password = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}');
    const navigate = useNavigate();
    const [email, setEmail] = useState()
    const [emailError, setEmailError] = useState("example@gmail.com")
    const [password, setPassword] = useState()
    const [repassword, setRePassword] = useState()
    const [passwordError, setPasswordError] = useState("Password must contain at least 8 characters and 15 maximum , 1 number, 1 upper and 1 lowercase and 1 especial character!")
    const [repasswordError, setRePasswordError] = useState()
    const [username, setUsername] = useState()
    const [usernameError, setUsernameError] = useState("Username must contain at least 6 characteres and 12 maximum")

    const handleEmail = (e) => {
        if (regex_email.test(e.target.value)) {
            setEmail(e.target.value)
            setEmailError("")
        }
        else {
            setEmailError("Invalid email")
            setEmail(null)
        }
    };
    const handleUsername = (e) => {
        if (regex_username.test(e.target.value)) {
            setUsername(e.target.value)
            setUsernameError("")
        }
        else {
            setUsernameError("Invalid Username (6 chars min 12 max)")
            setUsername(null)
        }
    };

    const handlePassword = (e) => {
        if (regex_password.test(e.target.value)) {
            setPassword(e.target.value)
            setPasswordError("")
        }
        else {
            setPasswordError("Password must contain at least 8 characters and 15 maximum , 1 number, 1 upper and 1 lowercase and 1 especial character!")
            setPassword(null)
        }
        

    };

    const handleRePassword = (e) => {
        console.log(password, email);
        if (e.target.value == password) {
            setRePassword(e.target.value)
            setRePasswordError("")   
        }
        else {

            setRePasswordError("the passwords do not match")
            setRePassword(null)


        }


    };
    return (
        <div className={styles.center}>
            <h1>Register</h1>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: ""

                }}
                onSubmit={async (values, actions) => {

                    values.email = email
                    values.password = password
                    values.username = username

                    if (email && username && password && repassword) {

                        try {
                            const resp = await createUserRequest(values);
    
                            Swal.fire('Your Account has been created')
                            navigate('/login');
    
    
                        } catch (error) {
                            Swal.fire({
                                position: 'top-end',
                                title: error.response.data.data,
                                icon: 'warning',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        
                    }
                    else{
                        Swal.fire({
                            position: 'top-end',
                            title: "Please fill the form correctly",
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    }

                    

                }
                }

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input name="username"
                            type="text"
                            placeholder="username"
                            onChange={handleUsername}
                            autoComplete="off"
                            value={props.username} required />
                            <br />
                        {usernameError}
                        <h3></h3>
                        <input name="email"
                            type="text"
                            placeholder="email"
                            onChange={handleEmail}
                            autoComplete="off"
                            value={props.email} required />
                        <br />
                        {emailError}
                        <h3></h3>
                        <input name="password"
                            type="password"
                            placeholder="password"
                            onChange={handlePassword}
                            autoComplete="off"
                            value={props.password} required />
                        <br />
                        
                        {passwordError}
                        <h3></h3>
                        <input name="password_re"
                            type="password"
                            placeholder="re type your password"
                            onChange={handleRePassword}
                            autoComplete="off"
                            required />
                        <br />
                        {repasswordError}
                        <br /><br />
                        <button type="submit">Register</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}