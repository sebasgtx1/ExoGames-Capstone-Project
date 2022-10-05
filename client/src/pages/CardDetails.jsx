import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../utils/httpClient";
import styles from './CardDetails.module.css'

export function CardDetails() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        get("/movie/" + eventId).then((data) => {
        setEvent(data);
        });
    }, [eventId]);

    if (!event) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w300" + event.poster_path;
    return (
        <div className={styles.detailsContainer}>
            <img
                className={`${styles.col} ${styles.cardImage}`}
                src={imageUrl}
                alt={event.title}
            />
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <p className={styles.firstItem}>
                <strong>Title:</strong> {event.title}
                </p>
                <p>
                <strong>Genres:</strong>{" "}
                {event.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                <strong>Description:</strong> {event.overview}
                </p>
            </div>
        </div>
    );
}