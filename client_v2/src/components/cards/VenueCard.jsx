import { Link } from 'react-router-dom'
import styles from '../styles/VenueCard.module.css'

export function VenueCard({ venue, src, user_id, token, username }) {
    return (
        <li key={venue.venue_id} className={styles.VenueCard}>
            <Link to={src} state={{ user_id: user_id, token: token, username: username}}>
                <img
                    width={316}
                    height={219}
                    className={styles.VenueImage} 
                    src={venue.image} />
                <div>
                    <p>
                        {venue.name} <br />
                    </p>
                </div>
            </Link>
        </li>);


}