import { Link } from 'react-router-dom'
import styles from '../styles/CompetitorCard.module.css'

export function CompetitorCard({ competitor }) {
    return (
        <li key={competitor.competitor_id} className={styles.CompetitorCard}>
            <Link to={"/competitor/" + competitor.competitor_id}>
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