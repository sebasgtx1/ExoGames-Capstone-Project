import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"
import stylesPullDown from "../styles/PullDown.module.css"
import { Button } from '../reusables/Button';
import { ButtonNoStyle } from '../reusables/ButtonNoStyle';
import { SearchBar } from '../reusables/SearchBar';
import Swal from 'sweetalert2'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';



export function ButtonUserContainer(props) {
    return (
        <div className={stylesButton.center_div}>
            <aside className={`${stylesPullDown.dropdown_menu} ${stylesPullDown.dropdown_menu_sw}`}>
                <div className={stylesPullDown.header_nav_current_user}><h1>Current User</h1></div>
                <div className={stylesPullDown.dropdown_divider}></div>
                <ButtonNoStyle src="/my_events" title="My Eventss"></ButtonNoStyle>
                <ButtonNoStyle src="/my_venues" title="My Venues"></ButtonNoStyle>
                <ButtonNoStyle src="/my_competitors" title=" My Competitors"></ButtonNoStyle>
                <div className={stylesPullDown.dropdown_divider}></div>
                <ButtonNoStyle src="/create_event" title="Create Event"></ButtonNoStyle>
                <ButtonNoStyle src="/create_venue" title="Create Venue"></ButtonNoStyle>
                <ButtonNoStyle src="/create_competitor" title="Create Competitor"></ButtonNoStyle>
                <ButtonNoStyle src="/events"  title="Log out"></ButtonNoStyle>
            </aside>
            <ul className={stylesButton.dataButtons}>
                <Button src={"/events/" + props.user_id} title="Events"></Button>
                <Button src={"/venues/" + props.user_id} title="Venues"></Button>
                <Button src={"/competitors/" + props.user_id} title="Competitors"></Button>
            </ul>
        </div>
    );
}