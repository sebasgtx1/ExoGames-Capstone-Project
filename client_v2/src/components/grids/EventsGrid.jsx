import { useEffect, useState } from "react";
import { getEventsRequest } from "../../api/events.api";
import { EventCard } from "../cards/EventCard"
import styles from "../styles/EventsGrid.module.css"

export function EventGrid() {
    const [events, setEvents] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getEventsRequest();
            setEvents(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {events.map((event) => (
                <EventCard key={event.event_id} event={event} />
            ))}
        </ul>
    );
}