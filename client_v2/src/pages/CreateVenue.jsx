import React, { useState } from "react";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { createVenueRequest } from "../api/venues.api";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Resizer from "react-image-file-resizer";


export function CreateVenue() {
    const navigate = useNavigate();
    const location = useLocation()
    const [previewSource, setPreviewSource] = useState();
    const { user_id, token, username } = location.state;
    const handleChangeFile = (event) => {

        {
            let fileInput = false;
            if (event.target.files[0]) {
                fileInput = true;
            }
            if (fileInput) {
                try {
                    Resizer.imageFileResizer(
                        event.target.files[0],
                        316,
                        219,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                            setPreviewSource(uri)
                        },
                        "base64",
                        316,
                        219
                    );
                } catch (err) {
                    console.log(err);
                }
            }
        }
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
                    values.image = previewSource;
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
                        <div>
                            {previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{ height: '219px', width: '316px', padding: '20px' }}
                            />
                        )}
                        </div>

                        <br />
                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}
