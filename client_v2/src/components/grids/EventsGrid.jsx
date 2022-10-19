import { useEffect, useState } from "react";
import { getEventsRequest } from "../../api/events.api";
import { getEventMatches } from "../../api/matches.api";
import { EventCard } from "../cards/EventCard"
import styles from "../styles/EventsGrid.module.css"

export function EventGrid({ user_id, token, username }) {
    const [events, setEvents] = useState([])

    useEffect(() => {

        async function loadTask() {
            const resp = await getEventsRequest();
            setEvents(resp.data);

        }
        loadTask();
    }, [])

    const getNextMatch = async (event_id) => {

        const resp = await getEventMatches(event_id);
         return resp.data[0]

    }



    if (user_id && token) {

        return (
            <ul className={styles.EventGrid}>
                {events.map((event) => (
                    <EventCard key={event.event_id} event={event} src={'/event/' + event.event_id + '/' + user_id} user_id={user_id} token={token} username={username} match={getNextMatch(event.event_id)}/>
                ))}
            </ul>
        );
        
    } else {

        return (
            <ul className={styles.EventGrid}>
                {events.map((event) => (
                    <EventCard key={event.event_id} event={event} src={'/event/' + event.event_id} />
                ))}
            </ul>
        );
        
    }

}