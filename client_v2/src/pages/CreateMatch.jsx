import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import styles from '../components/styles/CreateEvent.module.css'
import { CompetitrosList } from "../components/list/CompetitorsList";
import { useLocation } from "react-router-dom";
import { VenueList } from "../components/list/VenuesList";
import { createMatchRequest } from "../api/matches.api";
import Swal from 'sweetalert2'
import vs from "../components/styles/img/vs.svg"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export function CreateMatch() {
    const location = useLocation();
    const navigate = useNavigate();
    const { event_id, sport, user_id, token, username, addMatch } = location.state;
    const [startDate, setStartDate] = useState(dayjs(new Date()));
    const [startTime, setStartTime] = useState(dayjs(new Date()));

    const handleChangeDate = (newValue) => {
        setStartDate(newValue);
    };

    const handleChangeTime = (newValue) => {
        setStartTime(newValue);
    };

    function handleClick() {

        navigate('/my_events', {
            state: {
                user_id: user_id,
                token: token,
                username: username
            }
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    }
    function BackClick() {

        navigate('/update_create_event/' + event_id, {
            state: {
                event_id: event_id,
                user_id: user_id,
                token: token,
                username: username

            }
        })
    }

    let button = <button onClick={BackClick} >Back</button>
    if (addMatch) {
        button = null;
    }



    return (
        <div className={styles.center}>
            <h1>Create match</h1>
            <Formik
                initialValues={{
                    competitor1_id: "",
                    competitor2_id: "",
                    event_id: event_id,
                    venue_id: "",
                    competitor1_group: "",
                    competitor2_group: "",
                    date: "",
                    time: "",
                    token: token

                }}
                onSubmit={async (values, actions) => {
                    {startDate.$M += 1}
                    {values.date = (startDate.$y + "-" + startDate.$M + "-" + startDate.$D)};
                    {values.time = (startTime.$H + ":" + startTime.$m)};
                    console.log("New date :", values.date);
                    console.log("New time :", values.time);
                    if (values.competitor1_id == values.competitor2_id) {
                        Swal.fire({
                            position: 'top-end',
                            title: "The competitors for the match has to be diferent",
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 3500
                        })
                        

                    } else if (values.competitor1_group == values.competitor2_group) {
                        Swal.fire({
                            position: 'top-end',
                            title: "The group has to be different for each competitor",
                            icon: 'warning',
                            showConfirmButton: false,
                            timer: 3500
                        })

                    } 
                    else {

                        try {
                            const resp = await createMatchRequest(event_id, values);
                            Swal.fire('Match Created succesfully').then(() => {
                                window.location.reload(false);
                            })
                        } catch (error) {
                            console.log(error)
                        }

                    }

                }}

            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        {/* <label>competitor 1</label> */}

                        <CompetitrosList
                            name="competitor1_id"
                            sport={sport}
                            onChange={props.handleChange}
                        />

                        {/* <label>competitor 2</label> */}
                        <CompetitrosList
                            name="competitor2_id"
                            sport={sport}
                            onChange={props.handleChange} />
                        <br /><img src={vs}></img><br />
                        <select name="competitor1_group"
                            onChange={props.handleChange} required>
                            <option>Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <select name="competitor2_group"
                            onChange={props.handleChange} required>
                            <option >Group</option>
                            <option value="A">Group A</option>
                            <option value="B">Group B</option>
                        </select>
                        <br /><br />
                        <VenueList
                            name="venue_id"
                            onChange={props.handleChange} />
                        <br /><br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={1} className={styles.DateTime}>
                                <label>Date</label>
                                    <DesktopDatePicker
                                    label="Date desktop"
                                    inputFormat="MM/DD/YYYY"
                                    value={startDate}
                                    onChange={handleChangeDate}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                                    <label>Time</label><br />
                                    <TimePicker
                                    label="Time"
                                    value={startTime}
                                    onChange={handleChangeTime}
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                            </Stack>
                            </LocalizationProvider>
                        <br />
                        {button}
                        <button type="submit">Submit</button>
                        <button onClick={handleClick}>Finish</button>

                    </form>
                )}
            </Formik>
        </div>
    );
}