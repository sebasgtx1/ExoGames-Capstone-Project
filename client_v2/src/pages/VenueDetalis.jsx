import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getVenueIdRequest } from "../api/venues.api";
import { useLocation } from "react-router-dom";
import styles from '../components/styles/VenueDetails.module.css'
import { ButtonContainer } from "../components/button_containers/ButtonContainer";
import { ButtonUserContainer } from "../components/button_containers/ButtonUserContainer";


export function VenueDetails() {
    const { id } = useParams();
    const [venue, setVenues] = useState([]) 
    const location = useLocation();
    let { user_id, token, username } = {};


    if (!(location.state)) {
        user_id = window.localStorage.getItem("user_id");
        token = window.localStorage.getItem("token");
        username = window.localStorage.getItem("username");
        

    }
    else {
        user_id = location.state.user_id;
        token = location.state.token;
        username = location.state.username;
    }

    useEffect(() => {

        async function getVenue() {
            const resp = await getVenueIdRequest(id);
            setVenues(resp.data);

        }
        getVenue();
    }, [id])

    let button = <ButtonContainer/>
    if (user_id && token) {

      button = <ButtonUserContainer user_id={user_id} token={token} username={username}/>  
    }

    return (
        <>
        {button}
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
            </div>
        </div>
        </>);
}