import { Link } from 'react-router-dom'
import styles from './styles/EventCard.module.css'

export function EventCard({ event }) {
    const imageUrl = "../img/cancha.png"
    return (
        <li key={event.event_id} className={styles.EventCard}>
            <Link to={"/event/" + event.event_id}>
                <img
                    width={316}
                    height={234}
                    className={styles.EventImage} />
                <div>
                    <p>
                        Id event : {event.event_id} <br />
                        Event name : {event.event_name} <br />
                        Sport : {event.sport}
                    </p>
                </div>
            </Link>
        </li>);


}