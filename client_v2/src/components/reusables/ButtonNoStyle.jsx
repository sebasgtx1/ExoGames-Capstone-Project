import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function ButtonNoStyle(props) {
    return (<button className={stylesButton.dataInsideButton}><AiOutlineCloudUpload/><Link  to={props.src}>{props.title}</Link></button>);
}