import React from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import stylesSelect from '../components/styles/SelectComponent.module.css';
import { uploadFile } from "../api/upload.api";
import stylesInput from '../components/styles/InputElement.module.css';
import { useParams } from "react-router";
import { Formik } from 'formik';
import { getEventsIdRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { updateEventRequest } from "../api/events.api";
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";
import { deleteMatches } from "../api/matches.api";

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function UpdateEvent() {
    const { id } = useParams();
    const [event, setEvents] = useState([])
    const [wins, setWins] = useState(0)
    const [losses, setLosses] = useState(0)
    const [optionSelected, setOptionSelected] = useState()
    const location = useLocation();
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


    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(id);
            setEvents(resp.data);
            setLosses(resp.data.losses)
            setWins(resp.data.wins)

        }
        getEvent();
    }, [id])

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Update Event</h1>
            <Formik
                initialValues={{
                    event_name: event.event_name,
                    description: event.description,
                    sport: event.sport,
                    wins: event.wins,
                    losses: event.losses,
                    image: event.image


                }}
                onSubmit={async (values, actions) => {
                    values.wins = wins;
                    values.losses = losses;
                    values.sport = optionSelected ? optionSelected : event.sport;
                    try {
                        const resp = await uploadFile(file);
                        
                        values.image = resp.data.url ? resp.data.url : event.image;

                        
                    } catch (error) {
                        console.log(error);
                        
                    }

                    try {
                        if (optionSelected != event.sport && optionSelected) {
                            Swal.fire({
                                title: 'Are you sure to change the sport?',
                                text: "All your matches are going to be deleted!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes!'
                            }).then(async (result) => {
                                if (result.isConfirmed) {
                                    const resp = await deleteMatches(event.event_id);
                                    const resp2 = await updateEventRequest(values, id, token);
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    navigate(-1)
                                }
                            })
                        }
                        else {
                            const resp = await updateEventRequest(values, id, token);
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                            navigate(-1)
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
                            defaultValue={event.event_name}

                            required />
                        <h3></h3>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Description"

                            onChange={props.handleChange}
                            defaultValue={event.description}
                        />
                        <h3></h3>
                        {event && event.sport && <Select name="sport" type="text" defaultValue={{ value: event.sport, label: event.sport }} className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected} />}

                        <h3></h3>
                        <h1>Upload an image</h1>
                        <h3></h3>
                        <input type="file" name="image" accept="image/jpeg" onChange={handleChangeFile} />
                        <br />
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
                        <label>Losses</label> <br />

                        <input type="text" name="losses"
                            onChange={props.handleChange}
                            value={losses}
                            className={stylesInput.Width}
                            required />
                        <button onClick={incLosses} type="button">+</button>
                        <button onClick={decLosses} type="button">-</button>


                        <h3></h3>


                        <button type="Reset" >reset</button>
                        <button type="submit">Update</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}