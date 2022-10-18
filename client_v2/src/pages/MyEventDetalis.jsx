import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyEventIdRequest } from "../api/events.api";
import { DeleteButton } from "../components/button_containers/Delete_Button";
import styles from '../components/styles/EventDetails.module.css'
import stylesButtons from '../components/styles/ButtonContainer.module.css'
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
import vs from "../components/styles/img/vs.svg"



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
            <div>
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
                    <strong>Sport:</strong> {event.sport}
                </p>

                {/* <h2> <strong>Rules</strong> </h2>
                <p>
                    Wins: {event.wins} <br />
                    Losses: {event.losses}
                    
                </p> */}
                <h2> <strong>Matches</strong> </h2>
                <ul >
                    {matches.message == 'Matches not found' ? null : matches.map((match) => (
                        <div key={match.match_id}>

                            <li className={styles.MatchesStyle}>
                            <GetCompetitor id={match.competitor1_id} /> <img src={vs}></img> <GetCompetitor id={match.competitor2_id} /> <br />
                            <GetVenue id={match.venue_id} /> <br />
                            {match.date}, {match.time}</li>

                            <DeleteMatchButton match_id={match.match_id} user_id={user_id} token={token} username={username} />
                            <UpdateMatchButton match={match} user_id={user_id} token={token} username={username} sport={event.sport}/> <br /><br />
                        </div>
                    ))}
                </ul>
                <ul className={stylesButtons.dataButtons}>
                    <li className={stylesButtons.dataButton}><ButtonNoStyle className={stylesButtons.dataButton} src={"/update_event/" + event.event_id} title="Update" user_id={user_id} token={token} username={username}/></li>
                    <li className={stylesButtons.dataButton}><PublishEvent event_id={event.event_id} status={event.public_status} user_id={user_id} token={token} username={username}/></li>
                    <li className={stylesButtons.dataButton}><DeleteButton event_id={event.event_id} user_id={user_id} token={token} username={username}/></li>
                    <li className={stylesButtons.dataButton}><AddMatchButton event ={event} user_id={user_id} token={token} username={username}/></li>
                </ul>
                
            </div>

        </div>
        </>
    );
}