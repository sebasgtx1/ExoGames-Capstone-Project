import { useEffect, useState } from "react";
import { getVenuesRequest } from "../../api/venues.api";
import { VenueCard } from "../cards/VenueCard"
import styles from "../styles/EventsGrid.module.css"

export function VenueGrid() {
    const [venues, setVenues] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getVenuesRequest();
            setVenues(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {venues.map((venue) => (
                <VenueCard key={venue.venue_id} venue={venue} />
            ))}
        </ul>
    );
}