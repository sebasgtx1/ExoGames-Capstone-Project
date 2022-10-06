import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../utils/httpClient";
import styles from './CardDetails.module.css'

export function CardVenueDetails() {
    const { venueId } = useParams();
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        get("/movie/" + venueId).then((data) => {
        setVenue(data);
        });
    }, [venueId]);

    if (!venue) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w300" + venue.poster_path;
    return (
        <div className={styles.detailsContainer}>
            <img
                className={`${styles.col} ${styles.cardImage}`}
                src={imageUrl}
                alt={venue.title}
            />
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <p className={styles.firstItem}>
                <strong>Title:</strong> {venue.title}
                </p>
                <p>
                <strong>Genres:</strong>{" "}
                {venue.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                <strong>Description:</strong> {venue.overview}
                </p>
            </div>
        </div>
    );
}