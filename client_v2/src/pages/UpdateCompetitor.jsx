import React from "react";
import Select from 'react-select';
import stylesSelect from '../components/styles/SelectComponent.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { getCompetitorIdRequest, updateCompetitorRequest } from "../api/competitors.api";
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";
import Resizer from "react-image-file-resizer";

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function UpdateCompetitor() {
    const { id } = useParams();
    const location = useLocation();
    const [previewSource, setPreviewSource] = useState();
    const {user_id, token } = location.state;
    const [competitor, setCompetitor] = useState([])
    const [ optionSelected, setOptionSelected ] = useState();
    const navigate = useNavigate();

    const handleChangeSelected = (selectedOption) => {
        setOptionSelected(selectedOption.value);
    };

    useEffect(() => {

        async function getVenue() {
            const resp = await getCompetitorIdRequest(id);
            setCompetitor(resp.data);

        }
        getVenue();
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
            <h1>Update competitor</h1>
            <Formik
                initialValues={{
                    competitor_id: id,
                    name: competitor.name,
                    team_players: competitor.team_players,
                    description: competitor.description,
                    sport: competitor.sport,
                    image: competitor.image

                }}
                onSubmit={async (values, actions) => {
                    values.sport = optionSelected ? optionSelected : competitor.sport;
                    values.image = previewSource? previewSource : competitor.image;
                    try {
                        const resp = await updateCompetitorRequest(values, id, token);
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
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
                            placeholder="competitor name"
                            onChange={props.handleChange}
                            defaultValue={competitor.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="team_players"
                            rows="3"
                            placeholder="team players"
                            onChange={props.handleChange}
                            defaultValue={competitor.team_players} />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            defaultValue ={competitor.description} />
                        <h3></h3>
                        {competitor && competitor.sport && <Select name="sport" type="text" defaultValue={{ value: competitor.sport, label: competitor.sport}} className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected} />}
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