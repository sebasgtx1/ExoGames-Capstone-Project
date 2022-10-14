import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyCompetitorIdRequest } from "../api/competitors.api";
import { Button } from "../components/reusables/Button";
import styles from '../components/styles/CompetitorDetails.module.css'
import { DeleteButtonCompetitor } from "../components/button_containers/Delete_Button_competitor";
import { ButtonNoStyle } from "../components/reusables/ButtonNoStyle";


export function MyCompetitorDetails() {
    const { user_id, id } = useParams();
    const [competitor, setCompetitors] = useState([])

    useEffect(() => {

        async function getCompetitor() {
            const resp = await getMyCompetitorIdRequest(user_id, id);
            setCompetitors(resp.data);

        }
        getCompetitor();
    }, [user_id, id])

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
                <div >
                    <ButtonNoStyle src={"/update_competitor/" + competitor.competitor_id} title="Update" />
                    <DeleteButtonCompetitor competitor_id={competitor.competitor_id} />

                </div>
            </div>

        </div>
    );
}