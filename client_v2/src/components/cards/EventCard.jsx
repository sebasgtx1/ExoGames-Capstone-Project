import { Link } from 'react-router-dom'
import styles from '../styles/EventCard.module.css'
import { useEffect, useState } from "react";
import { getVenueIdRequest } from '../../api/venues.api';

const months = {
    '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
}

export function EventCard({ event, src, user_id, token, username, match }) {
    let my_date = "Not Matches"
    let my_year = ""
    const [my_match, setMatch] = useState()
    const [venue, setVenue] = useState("Not Venue (not matches set)")
    useEffect(() => {

        async function loadMatch() {
            setMatch(await match)
        }
        loadMatch();
    }, [])


    try {
        async function loadVenue() {
            if (my_match) {
                const resp = await getVenueIdRequest(my_match?.venue_id);
                setVenue(resp.data.name);

            }



        }
        loadVenue();
    } catch (error) {


    }


    try {
        let [year, month, day] = (my_match?.date).split(/[-]/);
        my_date = months[month] + '/' + day
        my_year = year

    } catch (error) {

    }



    return (
        <li key={event.event_id} className={styles.EventCard}>
            <Link to={src} state={{ user_id: user_id, token: token, username: username }}>
                <img
                    width={316}
                    height={219}
                    className={styles.EventImage}
                    src={event.image} />
                <div className={styles.EventCardText}>
                    <h3><strong>{event.event_name}</strong></h3>
                    <p>Sport : {event.sport}</p>
                    <div className={styles.hr} >Next match</div>

                    <div className={styles.containerDate}>

                        <p className={styles.Day}>{my_date}</p>
                        <p className={styles.Year}>{my_year}</p>
                    </div>
                    <br />
                    <p><strong> Venue</strong></p>
                    <p>{venue}</p>
                </div>
            </Link>


        </li>
    );


}