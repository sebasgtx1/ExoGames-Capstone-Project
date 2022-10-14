import { Link } from 'react-router-dom'
import styles from '../styles/VenueCard.module.css'

export function MyVenueCard({ venue, user_id }) {
    return (
        <li key={venue.venue_id} className={styles.VenueCard}>
            <Link to={"/venue/" + user_id + "/" + venue.venue_id}>
                <img
                    width={316}
                    height={234}
                    src={venue.image}
                    className={styles.VenueImage} />
                <div>
                    <p>
                       {venue.name} <br />
                    </p>
                </div>
            </Link>
        </li>);


}