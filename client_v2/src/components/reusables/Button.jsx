import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function Button(props) {
    return (<li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to={props.src} state={{ user_id: props.user_id, token: props.token, username: props.username}}>{props.title}</Link></li>);
}