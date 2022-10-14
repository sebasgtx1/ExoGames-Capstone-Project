import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompetitorIdRequest } from "../api/competitors.api";
import styles from '../components/styles/CompetitorDetails.module.css'


export function CompetitorDetails() {
    const { id } = useParams();
    const [competitor, setCompetitors] = useState([])

    useEffect(() => {

        async function getCompetitor() {
            const resp = await getCompetitorIdRequest(id);
            setCompetitors(resp.data);

        }
        getCompetitor();
    }, [id])

    return (
        <div className={styles.detailsContainer}>
            <div className={`${styles.col} ${styles.cardDetails}`}>
                <img
                    width={316}
                    height={234}
                    src={competitor.image}
                    className={styles.cardImage} />

                <p className={styles.firstItem}>
                    <h1><strong>{competitor.name}</strong> </h1> 
                    <p><strong>Description:</strong> {competitor.description} <br /></p>
                    
                    <p><strong>Team Players:</strong> {competitor.team_players} <br /></p>
                    
               
                   <p><strong>Sport:</strong> {competitor.sport}</p> 
                </p>
            </div>
        </div>
    );
}