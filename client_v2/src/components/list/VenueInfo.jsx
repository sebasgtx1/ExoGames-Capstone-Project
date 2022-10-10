import { useEffect, useState } from "react";
import { getVenueIdRequest } from "../../api/venues.api";

export function GetVenue (props) {

    const [venue, setVenue] = useState([])
    useEffect(() => {

        async function getVenue() {
            const resp = await getVenueIdRequest(props.id);

            setVenue(resp.data);

        }
        getVenue();
    }, [props.id])

    return (<>{venue.name}</>);

}