import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Formik } from 'formik';
import { createEventRequest } from '../api/events.api';
import styles from '../components/styles/CreateEvent.module.css'
import stylesSelect from '../components/styles/SelectComponent.module.css';
import IncDecCounter from '../components/button_containers/IncDecCounter'
import Swal from 'sweetalert2'
/* import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
 */

const options = [
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'archery', label: 'Archery' },
    { value: 'paintball', label: 'Paintball' }
]

export function CreateEvent() {
    const [ wins, setWins ] = useState(0)
    const [ losses, setLosses ] = useState(0)
    const [ optionSelected, setOptionSelected ] = useState('Football')

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

    const navigate = useNavigate();
    return (
        <div className={styles.center}>
            <h1>Create Event</h1>
            <Formik
                initialValues={{
                    event_name: "",
                    description: "",
                    sport: "football",
                    image: "",
                    wins: "",
                    losses: ""

                }}
                onSubmit={async (values, actions) => {
                    values.wins = wins;
                    values.losses = losses;
                    values.sport = optionSelected;
                    try {
                        const resp = await createEventRequest(values);
                        actions.resetForm();
                        Swal.fire('Event Created succesfully')
                        navigate('/create_match/' + resp.data.event_id,{
                            state: {
                              event_id: resp.data.event_id,
                              event_name: resp.data.event_name,
                              sport: resp.data.sport
                            }});
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
                        <Select name="sport" type="text" className={stylesSelect.SelectComponent} classNamePrefix="Select" options={options} onChange={handleChangeSelected}/>
                        <h3></h3>
                        <h1>Upload an image</h1>
                        <h3></h3>
                        <input type="file" name="image"
                        onChange={props.handleChange}/>
                        <h1>Rules</h1>
                        <label>Wins</label><br/>
                        <button onClick={decWins} type="button">-</button>
                        <input type="int" name="wins"
                            onChange={props.handleChange}
                            value={wins}
                            required />
                        <button onClick={incWins} type="button">+</button>
                        {/*< IncDecCounter />*/}
                        <h3></h3>
                        <label>Losses</label><br/>
                        <button onClick={decLosses} type="button">-</button>
                        <input type="text" name="losses"
                            onChange={props.handleChange}
                            value={losses}
                            required />
                        <button onClick={incLosses} type="button">+</button>
                        {/*< IncDecCounter />*/}
                        <h3></h3>

                        <button type="reset" >Reset</button>
                        <button type="submit">Next</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}