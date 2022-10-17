import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyEventIdRequest } from "../api/events.api";
import { DeleteButton } from "../components/button_containers/Delete_Button";
import styles from '../components/styles/EventDetails.module.css'
import { getEventMatches } from "../api/matches.api";
import { DeleteMatchButton } from "../components/button_containers/DeleteButtonMatch";
import { UpdateMatchButton } from "../components/button_containers/UpdateMatchButton";
import { GetCompetitor } from "../components/list/CompetitorInfo";
import { GetVenue } from "../components/list/VenueInfo";
import { AddMatchButton } from "../components/button_containers/AddMatchButton";
import { ButtonNoStyle } from "../components/reusables/ButtonNoStyle";
import { PublishEvent } from "../components/button_containers/PublishButton";
import { useLocation } from "react-router-dom";
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'



export function MyEventDetails() {
    const { user_id, id } = useParams();
    const [event, setEvents] = useState([])
    const [matches, setMaches] = useState([])
    const location = useLocation();
    const {token, username} = location.state;

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
        <>
        <ButtonUserContainer user_id={user_id} token={token} username={username}/>
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={219}
                    src={event.image}
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
                    <ButtonNoStyle src={"/update_event/" + event.event_id} title="Update" user_id={user_id} token={token} username={username}/>
                    <PublishEvent event_id={event.event_id} status={event.public_status} user_id={user_id} token={token} username={username}/>
                    <DeleteButton event_id={event.event_id} user_id={user_id} token={token} username={username}/>

                </div>
                <ul >
                    {matches.message == 'Matches not found' ? null : matches.map((match) => (
                        <div key={match.match_id}>

                            <li > match {match.match_id} : <GetCompetitor id={match.competitor1_id} />  vs <GetCompetitor id={match.competitor2_id} /> venue : <GetVenue id={match.venue_id} /> date : {match.date} time : {match.time}</li>

                            <DeleteMatchButton match_id={match.match_id} user_id={user_id} token={token} username={username} />
                            <UpdateMatchButton match={match} user_id={user_id} token={token} username={username} sport={event.sport}/>
                        </div>
                    ))}

                </ul>
                <AddMatchButton event ={event} user_id={user_id} token={token} username={username}/>
                
            </div>

        </div>
        </>
    );
}