import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyVenueIdRequest } from "../api/venues.api";
import styles from '../components/styles/VenueDetails.module.css'
import { DeleteButtonVenue } from "../components/button_containers/Delete_Button_venue";
import { ButtonNoStyle } from "../components/reusables/ButtonNoStyle";
import { useLocation } from "react-router-dom";
import { ButtonUserContainer } from "../components/button_containers/ButtonUserContainer";



export function MyVenueDetails() {
    const { user_id, id } = useParams();
    const [venue, setVenues] = useState([]);
    const location = useLocation();
    let { token, username } = {};


    if (!(location.state)) {
        token = window.localStorage.getItem("token");
        username = window.localStorage.getItem("username");

    }
    else {
        token = location.state.token;
        username = location.state.username;
    }
    useEffect(() => {

        async function getVenue() {
            const resp = await getMyVenueIdRequest(user_id, id);
            setVenues(resp.data);

        }
        getVenue();
    }, [user_id, id])

    return (
        <>
        <ButtonUserContainer user_id={user_id} token={token} username={username}/>
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={219}
                    src={venue.image}
                    className={styles.cardImage} />

                <p className={styles.firstItem}>
                    <strong>venue name:</strong> {venue.name}
                </p>
                <p>
                    <strong>Description:</strong> {venue.description}
                </p>
                <div >
                <ButtonNoStyle src={"/update_venue/" + venue.venue_id} title="Update" user_id={user_id} token={token} username={username}/>
                <DeleteButtonVenue venue_id={venue.venue_id} user_id={user_id} token={token} username={username}/>

            </div>
            </div>
            
        </div>
        </>);
}