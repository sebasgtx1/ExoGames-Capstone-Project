import { useEffect, useState } from "react";
import { getMyCompetitorsRequest } from "../../api/competitors.api";
import { CompetitorCard } from "../cards/CompetitorCard";
import styles from "../styles/EventsGrid.module.css"

export function MyCompetitorsGrid({ user_id, token, username }) {
    const [competitors, setCompetitors] = useState([])
    useEffect(() => {

        async function load() {
            const resp = await getMyCompetitorsRequest(user_id, token);
            setCompetitors(resp.data);
        }
        load();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {competitors.message == 'Competitors not found' ? null : competitors.map((competitor) => (
                < CompetitorCard key={competitor.competitor_id} competitor={competitor} src={'/my_competitor/' + user_id + '/' + competitor.competitor_id} user_id={user_id} token={token} username={username}/>
            ))}
        </ul>
    );
}