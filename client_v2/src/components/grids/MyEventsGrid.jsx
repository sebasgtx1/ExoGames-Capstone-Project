import { useEffect, useState } from "react";
import { getMyEventsRequest } from "../../api/events.api";
import { MyEventCard } from "../cards/MyEventCard";
import styles from "../styles/EventsGrid.module.css"

export function MyEventsGrid(props) {
    const [events, setEvents] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getMyEventsRequest(props.user_id);
            setEvents(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {events.map((event) => (
                <MyEventCard key={event.event_id} event={event} user_id={props.user_id}/>
            ))}
        </ul>
    );
}