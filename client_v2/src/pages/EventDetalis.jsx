import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventsIdRequest } from "../api/events.api";
import styles from '../components/styles/EventDetails.module.css'
import { getEventMatches } from "../api/matches.api";
import { GetCompetitor } from "../components/list/CompetitorInfo";
import { GetVenue } from "../components/list/VenueInfo";


export function EventDetails() {
    const { id } = useParams();

    const [event, setEvents] = useState([])
    const [matches, setMaches] = useState([])

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

    return (
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={234}
                    className={styles.cardImage}
                    src={event.image} />
                <h1><strong>{event.event_name}</strong> </h1>

                <p className={styles.firstItem}>

                </p>
                <p>
                    <strong>Description</strong><br /> {event.description}
                </p>
                <p>
                    <strong>sport:</strong> {event.sport}
                </p>

                <h2> <strong>Rules</strong> </h2>
                <p>
                    Wins: {event.wins} <br />
                    Losses: {event.losses}
                </p>

                <ul >
                    {matches.map((match) => (
                        <div key={match.match_id}>

                            <li > match {match.match_id} : <GetCompetitor id={match.competitor1_id} />  vs <GetCompetitor id={match.competitor2_id} /> venue : <GetVenue id={match.venue_id} /> date : {match.date} time : {match.time}</li>
                        </div>
                    ))}
                </ul>

            </div>

        </div>
    );
}