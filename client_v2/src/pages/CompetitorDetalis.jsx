import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompetitorIdRequest } from "../api/competitors.api";
import { useLocation } from "react-router-dom";
import styles from '../components/styles/CompetitorDetails.module.css'
import { ButtonContainer } from "../components/button_containers/ButtonContainer";
import { ButtonUserContainer } from "../components/button_containers/ButtonUserContainer";


export function CompetitorDetails() {
    const { id } = useParams();
    const [competitor, setCompetitors] = useState([])
    const location = useLocation();
    const {user_id, token, username} = location.state;

    useEffect(() => {

        async function getCompetitor() {
            const resp = await getCompetitorIdRequest(id);
            setCompetitors(resp.data);

        }
        getCompetitor();
    }, [id])
    let button = <ButtonContainer/>
    if (user_id && token) {

      button = <ButtonUserContainer user_id={user_id} token={token} username={username}/>  
    }


    return (<>
        {button}
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={219}
                    src={competitor.image}
                    className={styles.cardImage} />

                <div className={styles.firstItem}>
                    <h1><strong>{competitor.name}</strong> </h1> 
                    <p><strong>Description:</strong> {competitor.description} <br /></p>
                    
                    <p><strong>Team Players:</strong> {competitor.team_players} <br /></p>
                    
               
                   <p><strong>Sport:</strong> {competitor.sport}</p> 
                </div>
            </div>
        </div>
        </>);
}