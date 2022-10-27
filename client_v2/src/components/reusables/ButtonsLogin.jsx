import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function ButtonsLogin(props) {
    return (<li><Link className={stylesButton.dataInsideButton} to={props.src}>{props.title}</Link></li>);
}