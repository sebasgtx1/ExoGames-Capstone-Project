import React from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { Formik } from 'formik';
import Select from 'react-select';
import { uploadFile } from "../api/upload.api";
import stylesSelect from '../components/styles/SelectComponent.module.css';
import stylesInput from '../components/styles/InputElement.module.css';
import { getEventsIdRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesCheckBox from '../components/styles/CheckBox.module.css';
import { useEffect, useState } from "react";
import { updateEventRequest } from "../api/events.api";


const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function UpdateEventCreation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { event_id, user_id, token, username } = location.state;
    const [event, setEvents] = useState([])
    const [publicStatus, setPublicStatus] = useState('public');
    const [ wins, setWins ] = useState(0)
    const [ losses, setLosses ] = useState(0)
    const [ optionSelected, setOptionSelected ] = useState()
    const [file, setSaveFile] = useState(null);

    const handleChangeFile = (event) => {
        setSaveFile(event.target.files[0])

    }

    let incWins =()=>{
        if(wins<1000)
        {
            setWins(Number(wins)+1);
        }
    };
    let decWins = () => {
        if(wins>0)
        {
            setWins(wins - 1);
        }
    };
    let incLosses =()=>{
        if(losses<1000)
        {
            setLosses(Number(losses)+1);
        }
    };
    let decLosses = () => {
        if(losses>0)
        {
            setLosses(losses - 1);
        }
    };
    const handleChangeSelected = (selectedOption) => {
        setOptionSelected(selectedOption.value);
    };

    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(event_id);
            setEvents(resp.data);
            setLosses(resp.data.losses)
            setWins(resp.data.wins)

        }
        getEvent();
    }, [event_id])

    const handleChexbox = (e) => {

        e.target.checked ? setPublicStatus('private') : setPublicStatus('public')

    }

    return (
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    event_name: event.event_name,
                    description: event.description,
                    sport: event.sport,
                    wins: event.wins,
                    losses: event.losses,
                    image: event.image,
                    public_status: event.public_status,

                }
                }

                onSubmit={async (values, actions) => {
                    values.wins = wins;
                    values.losses = losses;
                    values.sport = optionSelected ? optionSelected : event.sport;
                    values.public_status = publicStatus
                    try {
                        const resp = await uploadFile(file);
                        
                        values.image = resp.data.url ? resp.data.url : event.image;

                        
                    } catch (error) {
                        console.log(error);
                        
                    }
                    try {

                        const resp = await updateEventRequest(values, event_id, token);
                        

                        navigate('/create_match/' + event_id, {
                            state: {
                                user_id: user_id,
                                username: username,
                                token: token,
                                event_id: event_id,
                                event_name: values.event_name,
                                sport: values.sport
                            }
                        });

                        
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
                        {event && event.sport && <Select name="sport" type="text" defaultValue={{ value: event.sport, label: event.sport}} className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected} />}

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
                        <div className={stylesCheckBox.switch_button}>
                            <p>Private</p>
                            {/* <!-- Checkbox --> */}
                            <input onChange={handleChexbox} type="checkbox" name="switch_button" id="switch_label" className={stylesCheckBox.switch_button__checkbox} />
                            {/* <!-- Botón --> */}
                            <label htmlFor="switch_label" className={stylesCheckBox.switch_button__label}></label>
                        </div>
                        <br /><br />

                        <h3></h3>
                        <button type="reset" >Reset</button>

                        <button type="submit">Next</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}