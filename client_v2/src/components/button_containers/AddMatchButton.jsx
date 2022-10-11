import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function AddMatchButton(props) {
    const navigate = useNavigate();
    const confirm = () => {

        navigate('/create_match/' + props.event.event_id, {
            state: {
                event_id: props.event.event_id
            }
        })

    }
    return (

        <button className={stylesButton.dataInsideButton} onClick={confirm}><BiAddToQueue />Add match</button>


    )
}