import { useEffect, useState } from "react";
import { getMyEventsRequest } from "../../api/events.api";
import { getEventMatches } from "../../api/matches.api";
import { EventCard } from "../cards/EventCard";
import styles from "../styles/EventsGrid.module.css"

export function MyEventsGrid({ user_id, token, username }) {
    const [events, setEvents] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getMyEventsRequest(user_id, token);
            setEvents(resp.data);

        }
        loadTask();
    }, [])

    const getNextMatch = async (event_id) => {

        const resp = await getEventMatches(event_id);
         return resp.data[0]

    }


    return (
        <ul className={styles.EventGrid}>
            {events.message == 'Events not found' ? null : events.map((event) => (
                <EventCard key={event.event_id} event={event} src={'/my_event/' + user_id + '/' + event.event_id} user_id={user_id} token={token} username={username} match={getNextMatch(event.event_id)} />
            ))}
        </ul>
    );

}