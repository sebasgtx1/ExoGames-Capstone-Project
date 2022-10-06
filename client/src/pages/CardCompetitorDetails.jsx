import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { get } from "../utils/httpClient";
import styles from './CardDetails.module.css'

export function CardCompetitorDetails() {
    const { competitorId } = useParams();
    const [competitor, setCompetitor] = useState(null);

    useEffect(() => {
        get("/movie/" + competitorId).then((data) => {
        setCompetitor(data);
        });
    }, [competitorId]);

    if (!competitor) {
        return null;
    }

    const imageUrl = "https://image.tmdb.org/t/p/w300" + competitor.poster_path;
    return (
        <div className={styles.detailsContainer}>
            <img
                className={`${styles.col} ${styles.cardImage}`}
                src={imageUrl}
                alt={competitor.title}
            />
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <p className={styles.firstItem}>
                <strong>Title:</strong> {competitor.title}
                </p>
                <p>
                <strong>Genres:</strong>{" "}
                {competitor.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p>
                <strong>Description:</strong> {competitor.overview}
                </p>
            </div>
        </div>
    );
}