import { getCompetitorIdRequest } from "../../api/competitors.api";
import { useEffect, useState } from "react";

export function GetCompetitor (props) {

    const [competitor, setCompetitor] = useState([])
    useEffect(() => {

        async function getCompetitor() {
            const resp = await getCompetitorIdRequest(props.id);

            setCompetitor(resp.data);

        }
        getCompetitor();
    }, [props.id])

    return (<>{competitor.name}</>);

}