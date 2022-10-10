import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyVenueIdRequest } from "../api/venues.api";
import styles from '../components/styles/VenueDetails.module.css'
import { Button } from "../components/reusables/Button";
import { DeleteButtonVenue } from "../components/button_containers/Delete_Button_venue";



export function MyVenueDetails() {
    const { user_id, id } = useParams();
    const [venue, setVenues] = useState([])

    useEffect(() => {

        async function getVenue() {
            const resp = await getMyVenueIdRequest(user_id, id);
            setVenues(resp.data);

        }
        getVenue();
    }, [user_id, id])

    return (
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={234}
                    className={styles.cardImage} />

                <p className={styles.firstItem}>
                    <strong>venue name:</strong> {venue.name}
                </p>
                <p>
                    <strong>Description:</strong> {venue.description}
                </p>
                <div >
                <Button src={"/update_venue/" + venue.venue_id} title="Update" />
                <DeleteButtonVenue venue_id={venue.venue_id} />

            </div>
            </div>
            
        </div>
    );
}