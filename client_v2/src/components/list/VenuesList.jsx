import { useEffect, useState } from "react";
import { getVenuesRequest } from "../../api/venues.api";


export function VenueList(props) {

    const [venues, setVenues] = useState([])
    useEffect(() => {

        async function load() {
            const resp = await getVenuesRequest();
            setVenues(resp.data);

        }
        load();
    }, []);
    return (
        <select name={props.name} type="int" onChange={props.onChange} required>
            <option>Select a venue</option>
            {venues.map((venue) => (
                <option key={venue.venue_id} value={venue.venue_id}>{venue.name}</option>
            ))}

        </select>


    );
}