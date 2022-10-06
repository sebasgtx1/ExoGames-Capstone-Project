import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEventsIdRequest } from "../api/events.api";
import styles from '../components/styles/EventDetails.module.css'


export function EventDetails() {
    const { id } = useParams();
    console.log(id);
    const [event, setEvents] = useState([])

    useEffect(() => {

        async function getEvent() {
            const resp = await getEventsIdRequest(id);
            console.log(resp.data);
            setEvents(resp.data);

        }
        getEvent();
    }, [id])

    const imageUrl = ""
    return (
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
            <img
                    width={316}
                    height={234}
                    className={styles.cardImage} />
                
                <p className={styles.firstItem}>
                <strong>Event name:</strong> {event.event_name}
                </p>
                <p>
                <strong>Description:</strong> {event.description}
                </p>
                <p>
                <strong>sport:</strong> {event.sport}
                </p>
            </div>
        </div>
    );
}