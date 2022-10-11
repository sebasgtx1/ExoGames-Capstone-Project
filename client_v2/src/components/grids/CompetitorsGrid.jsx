import { useEffect, useState } from "react";
import { getCompetitorsRequest } from "../../api/competitors.api";
import { CompetitorCard } from "../cards/CompetitorCard"
import styles from "../styles/EventsGrid.module.css"

export function CompetitorsGrid() {
    const [competitors, setCompetitors] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getCompetitorsRequest();
            setCompetitors(resp.data);

        }
        loadTask();
    }, [])
    return (
        <ul className={styles.EventGrid}>
            {competitors.map((competitor) => (
                < CompetitorCard key={competitor.competitor_id} competitor={competitor} />
            ))}
        </ul>
    );
}