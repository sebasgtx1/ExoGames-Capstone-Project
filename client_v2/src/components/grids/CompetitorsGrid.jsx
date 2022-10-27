import { useEffect, useState } from "react";
import { getCompetitorsRequest } from "../../api/competitors.api";
import { CompetitorCard } from "../cards/CompetitorCard"
import styles from "../styles/EventsGrid.module.css"

export function CompetitorsGrid({ user_id, token, username }) {
    const [competitors, setCompetitors] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getCompetitorsRequest();
            setCompetitors(resp.data);

        }
        loadTask();
    }, [])
    if (user_id && token) {

        return (
            <ul className={styles.EventGrid}>
                {competitors.map((competitor) => (
                    < CompetitorCard key={competitor.competitor_id} competitor={competitor} src={"/competitor/" + competitor.competitor_id + '/' + user_id} user_id={user_id} token={token} username={username}/>
                ))}
            </ul>
        );
        
    } else {
    return (
        <ul className={styles.EventGrid}>
            {competitors.map((competitor) => (
                < CompetitorCard key={competitor.competitor_id} competitor={competitor} src={"/competitor/" + competitor.competitor_id}/>
            ))}
        </ul>
    );}
}