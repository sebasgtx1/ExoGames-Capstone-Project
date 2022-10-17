import { BiAddToQueue } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"

export function AddMatchButton({event, user_id, token, username}) {
    const navigate = useNavigate();
    const confirm = () => {

        navigate('/create_match/' + event.event_id, {
            state: {
                event_id: event.event_id,
                sport: event.sport,
                user_id: user_id,
                token: token,
                username: username,
                addMatch: true
            }
        })
    }
    return (

        <button className={stylesButton.dataInsideButton} onClick={confirm}><BiAddToQueue />Add match</button>


    )
}