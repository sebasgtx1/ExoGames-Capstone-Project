import { useEffect, useState } from "react";
import { getVenuesRequest } from "../../api/venues.api";
import { VenueCard } from "../cards/VenueCard"
import styles from "../styles/EventsGrid.module.css"

export function VenueGrid({ user_id, token, username }) {
    const [venues, setVenues] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getVenuesRequest();
            setVenues(resp.data);

        }
        loadTask();
    }, [])

    if (user_id && token) {
        return (
            <ul className={styles.EventGrid}>
                {venues.message == 'Venues not found' ? null : venues.map((venue) => (
                    <VenueCard key={venue.venue_id} src={"/venue/" + venue.venue_id + '/' + user_id} venue={venue} user_id={user_id} token={token} username={username} />
                ))}
            </ul>
        );

    }

    else {
        return (
            <ul className={styles.EventGrid}>
                {venues.message == 'Venues not found' ? null : venues.map((venue) => (
                    <VenueCard key={venue.venue_id} src={"/venue/" + venue.venue_id} venue={venue} user_id={user_id} token={token} username={username} />
                ))}
            </ul>
        );
    }
}