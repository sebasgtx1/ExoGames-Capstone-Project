import { useEffect, useState } from "react";
import { getEventsRequest } from "../../api/events.api";
import styles from '../styles/SearchBar.module.css'
import { EventCard } from "../cards/EventCard";


export function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [events, setEvents] = useState([])
    useEffect(() => {

        async function loadTask() {
            const resp = await getEventsRequest();
            setEvents(resp.data);

        }
        loadTask();
    }, [])

    const handleChange = (e) => {

        setSearchInput(e.target.value);
    };

    if (searchInput.length > 0) {
        const [myevents] = events.filter((event) => {
            
            return event.event_name.match(searchInput);
        });
        console.log(myevents);
    }
    

    return <div className={styles.center}>

        <input className={styles.input}
            type="search"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} />


    </div>




}