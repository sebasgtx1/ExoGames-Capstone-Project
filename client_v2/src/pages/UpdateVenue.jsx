import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { getVenueIdRequest, updateVenueRequest } from "../api/venues.api";
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";
import Resizer from "react-image-file-resizer";

export function UpdateVenue() {
    const { id } = useParams();
    const [venue, setVenue] = useState([])
    const [previewSource, setPreviewSource] = useState();
    const location = useLocation();
    const {user_id, token } = location.state;
    const navigate = useNavigate();

    useEffect(() => {

        async function getEvent() {
            const resp = await getVenueIdRequest(id);
            setVenue(resp.data);

        }
        getEvent();
    }, [id])

    

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
            <h1>Update Venue</h1>
            <Formik
                initialValues={{
                    name: venue.name,
                    description: venue.description,
                    image: venue.image

                }}
                onSubmit={async (values, actions) => {
                    values.image = previewSource ? previewSource : venue.image;
                    try {
                        const resp = await updateVenueRequest(values, id, token);
                        Swal.fire('Venue Updated succesfully');
                        navigate(-1)
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
                            defaultValue={venue.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            defaultValue={venue.description} />
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
                        <button type="submit">Update</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}