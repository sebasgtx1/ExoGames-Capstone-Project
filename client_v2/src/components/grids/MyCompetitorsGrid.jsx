import { useEffect, useState } from "react";
import { getMyCompetitorsRequest } from "../../api/competitors.api";
import { MyCompetitorCard } from "../cards/MyCompetitorCard";
import styles from "../styles/EventsGrid.module.css"

export function MyCompetitorsGrid(props) {
    const [competitors, setCompetitors] = useState([])
    useEffect(() => {

        async function load() {
            const resp = await getMyCompetitorsRequest(props.user_id);
            setCompetitors(resp.data);
        }
        load();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {competitors.map((competitor) => (
                < MyCompetitorCard key={competitor.competitor_id} competitor={competitor} user_id={props.user_id}/>
            ))}
        </ul>
    );
}