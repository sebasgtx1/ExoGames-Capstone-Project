import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMyCompetitorIdRequest } from "../api/competitors.api";
import { Button } from "../components/reusables/Button";
import styles from '../components/styles/CompetitorDetails.module.css'
import { DeleteButtonCompetitor } from "../components/button_containers/Delete_Button_competitor";
import { ButtonNoStyle } from "../components/reusables/ButtonNoStyle";
import { useLocation } from "react-router-dom";
import { ButtonUserContainer } from '../components/button_containers/ButtonUserContainer'


export function MyCompetitorDetails() {
    const { user_id, id } = useParams();
    const [competitor, setCompetitors] = useState([]);
    const location = useLocation();
    const {token, username} = location.state;

    useEffect(() => {

        async function getCompetitor() {
            const resp = await getMyCompetitorIdRequest(user_id, id);
            setCompetitors(resp.data);

        }
        getCompetitor();
    }, [user_id, id])

    return (<>
        <ButtonUserContainer user_id={user_id} token={token} username={username}/>  
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
                <div >
                    <ButtonNoStyle src={"/update_competitor/" + competitor.competitor_id} title="Update" user_id={user_id} token={token} username={username}/>
                    <DeleteButtonCompetitor competitor_id={competitor.competitor_id} user_id={user_id} token={token} username={username}/>

                </div>
            </div>

        </div>
        </>);
}