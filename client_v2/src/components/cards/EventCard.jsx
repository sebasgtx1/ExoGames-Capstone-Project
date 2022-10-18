import { Link } from 'react-router-dom'
import styles from '../styles/EventCard.module.css'

export function EventCard({ event, src, user_id, token, username }) {
    return (
        <li key={event.event_id} className={styles.EventCard}>    
            <Link to={src} state={{ user_id: user_id, token: token, username: username}}>
                <img
                    width={316}
                    height={219}
                    className={styles.EventImage}
                    src={event.image} />
                <div className={styles.EventCardText}>
                    <strong><h3>{event.event_name}</h3></strong>
                    <p>Sport : {event.sport}</p>
                    <div className={styles.hr}/>
                    <div className={styles.containerDate}>
                        <p className={styles.Day}>Day<br /></p>
                        <p className={styles.Year}>Year</p>
                    </div>
                    <p>Venue</p>
                    <strong><h3>Venue's name</h3></strong>
                </div>
            </Link>


        </li>
    );


}