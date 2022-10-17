import { Link } from 'react-router-dom'
import styles from '../styles/CompetitorCard.module.css'

export function CompetitorCard({ competitor, src, user_id, token, username }) {
    return (
        <li key={competitor.competitor_id} className={styles.CompetitorCard}>
            <Link to={src} state={{ user_id: user_id, token: token, username: username}}>
                <img
                    width={316}
                    height={219}
                    src={competitor.image}
                    className={styles.CompetitorImage} />
                <div>
                    <p>

                        {competitor.name} <br />
                        Sport : {competitor.sport}
                    </p>
                </div>
            </Link>
        </li>);


}