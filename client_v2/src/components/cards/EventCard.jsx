import { Link } from 'react-router-dom'
import { Button } from '../reusables/Button';
import styles from '../styles/EventCard.module.css'


export function EventCard({ event }) {

    const base64String = btoa(String.fromCharCode(...new Uint8Array(event.image.data)));
    console.log(base64String );

    return (

        <li key={event.event_id} className={styles.EventCard}>
            
            <Link to={"/event/" + event.event_id}>
                <img
                    width={316}
                    height={234}
                    className={styles.EventImage}
                    src={`data:image/png;base64,${base64String}`} />
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