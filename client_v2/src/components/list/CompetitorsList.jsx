import { useEffect, useState } from "react";
import { getCompetitorsRequest } from "../../api/competitors.api";

export function CompetitrosList(props) {

    const [competitors, setCompetitors] = useState([])
    useEffect(() => {

        async function load() {
            const resp = await getCompetitorsRequest();
            setCompetitors(resp.data);

        }
        load();
    }, []);
    return (
        <select name={props.name} type="int" onChange={props.onChange} required>
            <option>Select a competitor</option>
            {competitors.map((competitor) => (
                <option key={competitor.competitor_id} value={competitor.competitor_id}>{competitor.name}</option>
            ))}

        </select>


    );
}