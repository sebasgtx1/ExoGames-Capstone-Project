import { useEffect, useState } from "react";
import { getMyVenuesRequest } from "../../api/venues.api";
import { MyVenueCard } from "../cards/MyVenueCard";
import styles from "../styles/EventsGrid.module.css"

export function MyVenuesGrid(props) {
    const [venues, setVenues] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getMyVenuesRequest(props.user_id);
            setVenues(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {venues.map((venue) => (
                <MyVenueCard key={venue.venue_id} venue={venue} user_id={props.user_id}/>
            ))}
        </ul>
    );
}