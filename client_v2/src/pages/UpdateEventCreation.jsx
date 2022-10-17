import React from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { Formik } from 'formik';
import Select from 'react-select';
import stylesSelect from '../components/styles/SelectComponent.module.css';
import stylesInput from '../components/styles/InputElement.module.css';
import { getEventsIdRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import { useEffect, useState } from "react";
import { updateEventRequest } from "../api/events.api";
import Swal from 'sweetalert2'

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
    const [defaultLabel, setLabel] = useState('')
    const [ wins, setWins ] = useState(0)
    const [ losses, setLosses ] = useState(0)
    const [ optionSelected, setOptionSelected ] = useState('football')

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
        console.log(selectedOption);
        setOptionSelected(selectedOption.value);
    };

    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(event_id);
            setEvents(resp.data);
            setLosses(resp.data.losses)
            setWins(resp.data.wins)
            setLabel(String(resp.data.sport));
            setOptionSelected( resp.data.sport)

        }
        getEvent();
    }, [event_id])



    return (
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    event_name: event.event_name,
                    description: event.description,
                    sport: event.sport,
                    wins: event.wins,
                    losses: event.losses

                }
                }

                onSubmit={async (values, actions) => {
                    values.wins = wins;
                    values.losses = losses;
                    values.sport = optionSelected;
                    try {

                        try {
                            const check = values.map((item) => {
                            console.log(item);
                            if (typeof item == 'undefined') {
                                
                                navigate(-1)
                            }
                        })} catch {
                            navigate(-1)
                        }
                        


                        const resp = await updateEventRequest(values, event_id);
                        

                        navigate('/create_match/' + event_id, {
                            state: {
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
                        <Select name="sport" type="text" className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected}/>

                        <h3></h3>
                        <label>Wins</label><br/>
                        <button onClick={decWins} type="button">-</button>
                        <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={wins}
                            className={stylesInput.Width}
                            required />
                        <button onClick={incWins} type="button">+</button>
                        <h3></h3>
                        <label>Losses</label>
                        <button onClick={decLosses} type="button">-</button>
                        <input type="text" name="losses"
                            onChange={props.handleChange}
                            value={losses}
                            className={stylesInput.Width}
                            required />
                        <button onClick={incLosses} type="button">+</button>

                        <h3></h3>
                        <button type="reset" >Reset</button>

                        <button type="submit">Next</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}