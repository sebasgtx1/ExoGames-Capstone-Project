import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import stylesInput from '../components/styles/InputElement.module.css';
import stylesCheckBox from '../components/styles/CheckBox.module.css';
import Swal from 'sweetalert2'

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]


export function CreateEvent() {
    const location = useLocation()
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [optionSelected, setOptionSelected] = useState('football')
    const [previewSource, setPreviewSource] = useState();
    const [publicStatus, setPublicStatus] = useState('public');
    const [saveStatus, setSaveStatus] = useState(false);
    let { user_id, token, username } = {};


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

    let incWins = () => {
        if (wins < 1000) {
            setWins(Number(wins) + 1);
        }
    };
    let decWins = () => {
        if (wins > 0) {
            setWins(wins - 1);
        }
    };
    let incLosses = () => {
        if (losses < 1000) {
            setLosses(Number(losses) + 1);
        }
    };
    let decLosses = () => {
        if (losses > 0) {
            setLosses(losses - 1);
        }
    };
    const handleChangeSelected = (selectedOption) => {
        setOptionSelected(selectedOption.value);
    };

    const handleChexbox = (e) => {

        e.target.checked ? setPublicStatus('private') : setPublicStatus('public')

    }
    const SaveDraft = (e) => {

        setPublicStatus('private');
        setSaveStatus(true)

    }


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

    const navigate = useNavigate();
    return (<>
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    user_id: user_id,
                    event_name: "",
                    description: "",
                    sport: "football",
                    image: "",
                    wins: "",
                    losses: "",
                    status: "active",
                    public_status: "",
                    token: token

                }}
                onSubmit={async (values, actions) => {
                    values.wins = wins;
                    values.losses = losses;
                    values.sport = optionSelected;
                    values.public_status = publicStatus
                    values.image = previewSource;

                    try {

                        const resp = await createEventRequest(values, token);
                        actions.resetForm();

                        if (saveStatus) {
                            Swal.fire('Event Saved succesfully')
                            navigate('/my_events', {
                                state: {
                                    user_id: user_id,
                                    token: token,
                                    username: username
                                }
                            })

                        }
                        else {
                            Swal.fire('Event created succesfully')
                            navigate('/create_match/' + resp.data.event_id, {
                                state: {
                                    event_id: resp.data.event_id,
                                    event_name: resp.data.event_name,
                                    sport: resp.data.sport,
                                    user_id: user_id,
                                    token: token,
                                    username: username

                                }
                            });
                        }
                    } catch (error) {
                        console.log(error)

                    }
                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <h3></h3>
                        <input type="text" name="event_name"
                            placeholder="Event Name"
                            onChange={props.handleChange}
                            value={props.values.event_name}
                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"
                            onChange={props.handleChange}
                            value={props.values.description} />
                        <h3></h3>
                        <Select name="sport" type="text" className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected} />
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


                        <h1>Rules</h1>
                        <label>Wins</label><br />
                        <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={wins}
                            className={stylesInput.Width}
                            required />
                        <button onClick={incWins} type="button">+</button>
                        <button onClick={decWins} type="button">-</button>
                        <h3></h3>
                        <label>Losses</label><br />
                        <input type="text" name="losses"
                            onChange={props.handleChange}
                            value={losses}
                            className={stylesInput.Width}
                            required />
                        <button onClick={incLosses} type="button">+</button>
                        <button onClick={decLosses} type="button">-</button>
                        <h3></h3>


                        <div className={stylesCheckBox.switch_button}>
                            <p>Private</p>
                            {/* <!-- Checkbox --> */}
                            <input onChange={handleChexbox} type="checkbox" name="switch_button" id="switch_label" className={stylesCheckBox.switch_button__checkbox} />
                            {/* <!-- Botón --> */}
                            <label htmlFor="switch_label" className={stylesCheckBox.switch_button__label}></label>
                        </div>
                        <br /><br />
                        <button type="reset">Reset</button>
                        <button type="submit" onClick={SaveDraft}>Save draft</button>
                        <button type="submit">Next</button>

                    </form>

                )}
            </Formik>
        </div>
    </>);
}