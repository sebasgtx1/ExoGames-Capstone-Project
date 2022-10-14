import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVenueIdRequest } from "../api/venues.api";
import styles from '../components/styles/VenueDetails.module.css'


export function VenueDetails() {
    const { id } = useParams();
    const [venue, setVenues] = useState([])

    useEffect(() => {

        async function getVenue() {
            const resp = await getVenueIdRequest(id);
            setVenues(resp.data);

        }
        getVenue();
    }, [id])

    return (
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
            <img
                    width={316}
                    height={234}
                    src={venue.image}
                    className={styles.cardImage} />
                
                <p className={styles.firstItem}>
                <strong>venue name:</strong> {venue.name}
                </p>
                <p>
                <strong>Description:</strong> {venue.description}
                </p>
            </div>
        </div>
    );
}