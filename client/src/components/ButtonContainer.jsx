import styles from "./ButtonContainer.module.css"
import { Link } from 'react-router-dom'

export function ButtonContainer() {
    return (
        <div className={styles.center_div}>
            <ul className={styles.dataButtons}>
                <li className={styles.dataButton}><Link className={styles.dataInsideButton} to="/">Events</Link></li>
                <li className={styles.dataButton}><Link className={styles.dataInsideButton} to="venues">Venues</Link></li>
                <li className={styles.dataButton}><Link className={styles.dataInsideButton} to="competitors">Competitors</Link></li>
                <li className={styles.dataButton}><Link className={styles.dataInsideButton} to="login">Register / Login</Link></li>
            </ul>
        </div>
    );
}