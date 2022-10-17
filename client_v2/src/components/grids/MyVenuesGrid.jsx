import { useEffect, useState } from "react";
import { getMyVenuesRequest } from "../../api/venues.api";
import { VenueCard } from "../cards/VenueCard";
import styles from "../styles/EventsGrid.module.css"

export function MyVenuesGrid({ user_id, token, username }) {
    const [venues, setVenues] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getMyVenuesRequest(user_id, token);
            setVenues(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {venues.message == 'Venues not found' ? null : venues.map((venue) => (
                <VenueCard key={venue.venue_id} venue={venue} src={"/my_venue/" + user_id + "/" + venue.venue_id} user_id={user_id} token={token} username={username}/>
            ))}
        </ul>
    );
}