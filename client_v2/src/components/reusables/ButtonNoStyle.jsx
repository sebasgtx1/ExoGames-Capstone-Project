import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function ButtonNoStyle(props) {
    return (<Link  to={props.src}><button className={stylesButton.dataInsideButton}><AiOutlineCloudUpload/>{props.title}</button></Link>);
}