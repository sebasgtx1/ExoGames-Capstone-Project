import { Link } from 'react-router-dom'
import styles from '../styles/CompetitorCard.module.css'

export function MyCompetitorCard({ competitor, user_id }) {
    return (
        <li key={competitor.competitor_id} className={styles.CompetitorCard}>
            <Link to={"/competitor/" + user_id + "/" + competitor.competitor_id}>
                <img
                    width={316}
                    height={234}
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