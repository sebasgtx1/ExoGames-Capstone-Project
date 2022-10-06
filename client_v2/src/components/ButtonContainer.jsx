import stylesButton from "./styles/ButtonContainer.module.css"
import { Link } from 'react-router-dom'

export function ButtonContainer() {
    return (
        <div className={stylesButton.center_div}>
            <ul className={stylesButton.dataButtons}>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/events">Events</Link></li>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/venues">Venues</Link></li>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/competitors">Competitors</Link></li>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/users">Register / Login</Link>
                </li>
            </ul>
        </div>
    );
}