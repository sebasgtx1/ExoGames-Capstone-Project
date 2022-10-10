import { useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from "react-icons/ai";

export function UpdateMatchButton(props) {
    const navigate = useNavigate();
    const confirm = () => {

        navigate('/update_match/' + props.match.match_id, {
            state : {
                match: props.match
            }
        })
        
    }
    return (

        <AiTwotoneEdit onClick={confirm} />


    )
}