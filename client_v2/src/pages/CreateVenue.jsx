import React, { useState } from "react";
import { Form, Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { createVenueRequest } from "../api/venues.api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Resizer from "react-image-file-resizer";


export function CreateVenue() {
    const navigate = useNavigate();
    const [previewSource, setPreviewSource] = useState();
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
                        234,
                        "JPEG",
                        100,
                        0,
                        (uri) => {
                            setPreviewSource(uri)
                        },
                        "base64",
                        316,
                        234
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
                    name: "",
                    description: "",
                    image: ""

                }}
                onSubmit={async (values, actions) => {
                    values.image = previewSource;
                    try {
                        await createVenueRequest(values);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_venues')

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
                                style={{ height: '244px', width: '316px', padding: '20px' }}
                            />
                        )}
                        </div>


                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}
