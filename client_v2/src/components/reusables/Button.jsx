import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function Button(props) {
    return (<li className={stylesButton.dataButton}><Link className={stylesButton.dataInsideButton} to={props.src}>{props.title}</Link></li>);
}