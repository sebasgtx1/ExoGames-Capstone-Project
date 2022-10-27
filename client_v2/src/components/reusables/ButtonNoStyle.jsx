import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function ButtonNoStyle(props) {
    return (<Link  to={props.src} state={{ user_id: props.user_id, token: props.token}}><button className={stylesButton.dataUserInsideButton} ><AiOutlineCloudUpload/>{props.title}</button></Link>);
}