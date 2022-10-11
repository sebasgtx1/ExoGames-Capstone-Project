import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyEventIdRequest } from "../api/events.api";
import { Button } from "../components/reusables/Button";
import { DeleteButton } from "../components/button_containers/Delete_Button";
import styles from '../components/styles/EventDetails.module.css'
import { getEventMatches } from "../api/matches.api";
import { DeleteMatchButton } from "../components/button_containers/DeleteButtonMatch";
import { AiFillDelete } from "react-icons/ai";
import { UpdateMatchButton } from "../components/button_containers/UpdateMatchButton";
import { GetCompetitor } from "../components/list/CompetitorInfo";
import { GetVenue } from "../components/list/VenueInfo";
import { AddMatchButton } from "../components/button_containers/AddMatchButton";



export function MyEventDetails() {
    const { user_id, id } = useParams();
    const [event, setEvents] = useState([])
    const [matches, setMaches] = useState([])

    useEffect(() => {

        async function getEvent() {
            const resp = await getMyEventIdRequest(user_id, id);
            setEvents(resp.data);

        }
        getEvent();
    }, [user_id, id])

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
                    className={styles.cardImage} />
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
                <div >
                    <Button src={"/update_event/" + event.event_id} title="Update" />
                    <DeleteButton event_id={event.event_id} />

                </div>
                <ul >
                    {matches.map((match) => (
                        <div key={match.match_id}>

                            <li > match {match.match_id} : <GetCompetitor id={match.competitor1_id} />  vs <GetCompetitor id={match.competitor2_id} /> venue : <GetVenue id={match.venue_id} /> date : {match.date} time : {match.time}</li>

                            <DeleteMatchButton match_id={match.match_id} />
                            <UpdateMatchButton match={match} />
                        </div>
                    ))}

                </ul>
                <AddMatchButton event ={event}/>
                
            </div>

        </div>
    );
}