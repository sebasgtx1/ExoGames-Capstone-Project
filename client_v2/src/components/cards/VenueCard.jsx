import { Link } from 'react-router-dom'
import styles from '../styles/VenueCard.module.css'

export function VenueCard({ venue }) {
    return (
        <li key={venue.venue_id} className={styles.VenueCard}>
            <Link to={"/venue/" + venue.venue_id}>
                <img
                    width={316}
                    height={234}
                    className={styles.VenueImage} />
                <div>
                    <p>
                        {venue.name} <br />
                    </p>
                </div>
            </Link>
        </li>);


}