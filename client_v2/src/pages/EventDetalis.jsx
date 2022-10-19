import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventsIdRequest } from "../api/events.api";
import styles from '../components/styles/EventDetails.module.css'
import { getEventMatches } from "../api/matches.api";
import { GetCompetitor } from "../components/list/CompetitorInfo";
import { GetVenue } from "../components/list/VenueInfo";
import { useLocation } from "react-router-dom";
import { ButtonContainer } from "../components/button_containers/ButtonContainer";
import { ButtonUserContainer } from "../components/button_containers/ButtonUserContainer";
import vs from "../components/styles/img/vs.svg"


export function EventDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [event, setEvents] = useState([])
    const [matches, setMaches] = useState([])

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

    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(id);
            setEvents(resp.data);

        }
        getEvent();
    }, [id])

    useEffect(() => {

        async function load() {
            const resp = await getEventMatches(id);
            setMaches(resp.data);

        }
        load();
    }, [id]);
    let button = <ButtonContainer/>
    if (user_id && token) {

      button = <ButtonUserContainer user_id={user_id} token={token} username={username}/>  
    }

    return (
        <>
        {button}
        <div className={styles.detailsContainer}>
            <div>
                <article>
                    <img
                        width={450}
                        height={300}
                        className={styles.cardImage}
                        src={event.image} />
                    <h1><strong>{event.event_name}</strong> </h1>
                </article>

                <p className={styles.firstItem}>

                </p>
                <p>
                    <strong>Description</strong><br /> {event.description}
                </p>
                <p>
                    <strong>Sport : </strong> {event.sport}
                </p>

                {/* <h2> <strong>Rules</strong> </h2>
                <p>
                    Wins: {event.wins} <br />
                    Losses: {event.losses}
                </p> */}
                
                <h2> {matches.message == 'Matches not found' ? null : <strong>Matches</strong>} </h2>
                <ul >
                    {matches.message == 'Matches not found' ? null : matches.map((match) => (
                        <div key={match.match_id}>
                            <li className={styles.matches}>
                            <GetCompetitor id={match.competitor1_id} /> <img src={vs}></img> <GetCompetitor id={match.competitor2_id} /> <br />
                            <GetVenue id={match.venue_id} /> <br />
                            {match.date}, {match.time}</li> <br />
                        </div>
                    ))}
                </ul>

            </div>

        </div>
        </>);
}