import React, { useState } from "react";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { createVenueRequest } from "../api/venues.api";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { uploadFile } from "../api/upload.api";


export function CreateVenue() {
    const navigate = useNavigate();
    const location = useLocation()
    let { user_id, token, username } = {};
    const [file, setSaveFile] = useState(null);

    const handleChangeFile = (event) => {
        setSaveFile(event.target.files[0])

    }



    if (!(location.state)) {
        user_id = window.localStorage.getItem("user_id");
        token = window.localStorage.getItem("token");
        username = window.localStorage.getItem("username");
        

    }
    else {
        user_id = location.state.user_id;
        token = location.state.token;
        username = location.state.username;
    }
    
    return (
        <div className={styles.center}>
            <h1>Create Venue</h1>
            <Formik
                initialValues={{
                    user_id: user_id,
                    name: "",
                    description: "",
                    image: ""

                }}
                onSubmit={async (values, actions) => {
                    try {
                        const resp = await uploadFile(file);
                        
                        values.image = resp.data.url;

                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                    try {
                        await createVenueRequest(values, token);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_venues', {
                            state: {
                                user_id: user_id,
                                token: token,
                                username: username
                            }
                        })

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

                        <h1>Upload an image</h1>
                        <h3></h3>
                        <input type="file" name="image" accept="image/jpeg" onChange={handleChangeFile} />
                        <br />
                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}
