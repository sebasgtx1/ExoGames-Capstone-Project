import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"
import { Button } from '../reusables/Button';
import { SearchBar } from '../reusables/SearchBar';
import Swal from 'sweetalert2'

export function ButtonUserContainer(props) {
    return (
        <div className={stylesButton.center_div}>
            <ul className={stylesButton.dataButtons}>
                <Button src={"/events/" + props.user_id} title="Events"></Button>
                <Button src={"/venues/" + props.user_id} title="Venues"></Button>
                <Button src={"/competitors/" + props.user_id} title="Competitors"></Button>
                <Button src="/user" title="Root"></Button>
            </ul>

            <div className={stylesButton.center_div}>

                <ul className={stylesButton.dataButtons}>
                    <Button src="/my_events" title="My Eventss"></Button>
                    <Button src="/my_venues" title="My Venues"></Button>
                    <Button src="/my_competitors" title=" My Competitors"></Button>
                </ul>
                <div>
                    {/* <SearchBar /> */}
                </div>
                <ul className={stylesButton.dataButtons}>
                    <Button src="/create_event" title="Create Event"></Button>
                    <Button src="/create_venue" title="Create Venue"></Button>
                    <Button src="/create_competitor" title="Create Competitor"></Button>
                    <Button src="/events"  title="Log out"></Button>
                </ul>
            </div>

        </div>



    );
}