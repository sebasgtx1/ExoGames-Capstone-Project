import { useNavigate } from 'react-router-dom'
import { AiTwotoneEdit } from "react-icons/ai";

export function UpdateMatchButton({ match, user_id, token, username, sport }) {
    const navigate = useNavigate();
    const confirm = () => {

        navigate('/update_match/' + match.match_id, {
            state : {
                match: match,
                token: token,
                user_id : user_id,
                username : username,
                sport: sport
            }
        })
        
    }
    return (

        <AiTwotoneEdit onClick={confirm} />


    )
}