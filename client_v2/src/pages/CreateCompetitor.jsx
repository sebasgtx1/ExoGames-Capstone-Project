import React, { useState } from "react";
import Select from 'react-select';
import { Formik } from 'formik';
import { createCompetitorRequest } from "../api/competitors.api";
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Resizer from "react-image-file-resizer";

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function CreateCompetitor() {
    const navigate = useNavigate();
    const [ optionSelected, setOptionSelected ] = useState('football')
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

    const handleChangeSelected = (selectedOption) => {
        console.log(selectedOption);
        setOptionSelected(selectedOption.value);
    };
    return (
        <div className={styles.center}>
            <h1>Create competitor</h1>
            <Formik
                initialValues={{
                    name: "",
                    team_players: "",
                    description: "",
                    sport: "football",
                    image: ""

                }}
                onSubmit={async (values, actions) => {
                    values.sport = optionSelected;
                    values.image = previewSource;
                    try {
                        await createCompetitorRequest(values);
                        actions.resetForm();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/my_competitors')
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input type="text" name="name"
                            placeholder="Competitor Name"
                            onChange={props.handleChange}
                            value={props.values.name}
                            required />
                        <h3></h3>
                        <textarea
                            name="team_players"
                            rows="3"
                            placeholder="Team Players"
                            onChange={props.handleChange}
                            value={props.values.team_players} />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        <Select name="sport" type="text" className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected}/>
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

                        <button type="reset" >Reset</button>
                        <button type="submit">Submit</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}