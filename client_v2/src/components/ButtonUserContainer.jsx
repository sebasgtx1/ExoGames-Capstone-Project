import { Link } from 'react-router-dom'
import stylesButton from "./styles/ButtonContainer.module.css"

export function ButtonUserContainer() {
    return (
        <div>
          <div className={stylesButton.center_div}>
              <ul className={stylesButton.dataButtons}>
                  <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/events">Events</Link></li>
                  <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/venues">Venues</Link></li>
                  <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/competitors">Competitors</Link></li>
                  <li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to="/users">Name</Link></li>
              </ul>
          </div>
          <div className={stylesButton.center_div}>
            <ul className={stylesButton.dataButtons}>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataUserInsideButton} to="/create_event">Create Event</Link></li>
                <li className={stylesButton.dataButton}><Link className={stylesButton.dataUserInsideButton} to="/create_competitor">Create Coompetitor</Link></li>
            </ul>
        </div>
      </div>
    );
}