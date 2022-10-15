import { Link } from 'react-router-dom'
import stylesButton from "../styles/ButtonContainer.module.css"
import stylesDropdownUser from "../styles/DropdownUser.module.css"
import { Button } from '../reusables/Button';
import { ButtonNoStyle } from '../reusables/ButtonNoStyle';
import { SearchBar } from '../reusables/SearchBar';
import Swal from 'sweetalert2'
/* import 'react-dropdown/style.css';
 */
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'



export function ButtonUserContainer(props) {
    const [dropdown, setDropdown] = useState(false);

    const openCloseDropdown = () => {
        setDropdown(!dropdown);
    }
    return (
        <div className={stylesButton.center_div}>
            <aside className={stylesDropdownUser.dropdown_menu}>
                <Dropdown isOpen={dropdown} toggle={openCloseDropdown} size="lg">
                    <DropdownToggle caret>
                        Current User
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem divider />
                        <DropdownItem><Link to="/my_events" className={stylesDropdownUser.dataInsideButton}>My Events</Link>
</DropdownItem>
                        <DropdownItem><Link to="/my_venues" className={stylesDropdownUser.dataInsideButton}>My Venues</Link></DropdownItem>
                        <DropdownItem><Link to="/my_competitors" className={stylesDropdownUser.dataInsideButton}>My Competitors</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Link to="/create_event" className={stylesDropdownUser.dataInsideButton}>Create Event</Link></DropdownItem>
                        <DropdownItem><Link to="/create_venue" className={stylesDropdownUser.dataInsideButton}>Create Venue</Link></DropdownItem>
                        <DropdownItem><Link to="/create_competitor" className={stylesDropdownUser.dataInsideButton}>Create Competitor</Link></DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Link to="/events" className={stylesDropdownUser.dataInsideButton}>Log Out</Link></DropdownItem>
                        <DropdownItem divider />
                    </DropdownMenu>
                </Dropdown>
            </aside>
            <ul className={stylesButton.dataButtons}>
                <Button src={"/events/" + props.user_id} title="Events"></Button>
                <Button src={"/venues/" + props.user_id} title="Venues"></Button>
                <Button src={"/competitors/" + props.user_id} title="Competitors"></Button>
            </ul>
        </div>
    );
}