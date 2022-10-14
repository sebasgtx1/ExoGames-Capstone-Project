import { Link } from 'react-router-dom'
import { Button } from '../reusables/Button';
import styles from '../styles/EventCard.module.css'


export function EventCard({ event }) {


    return (

        <li key={event.event_id} className={styles.EventCard}>
            
            <Link to={"/event/" + event.event_id}>
                <img
                    width={316}
                    height={234}
                    className={styles.EventImage}
                    src={event.image} />
                <div>
                    <strong><h3>{event.event_name}</h3></strong>
                    <p>

                        Sport : {event.sport}
                    </p>

                </div>
            </Link>


        </li>



    );


}