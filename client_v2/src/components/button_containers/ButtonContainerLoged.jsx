import stylesButton from "../styles/ButtonContainer.module.css"
import { Button } from "../reusables/Button";
import { SearchBar } from "../reusables/SearchBar";

export function ButtonContainerLoged(props) {
    return (
        <div>
            <div className={stylesButton.center_div}>
                <ul className={stylesButton.dataButtons}>
                <Button src={"/events/" + props.user_id} title="Events"></Button>
                <Button src={"/venues/" + props.user_id} title="Venues"></Button>
                <Button src={"/competitors/" + props.user_id} title="Competitors"></Button>
                <Button src="/user" title="Root"></Button>
                </ul>
            </div>
            <div>
                {/* <SearchBar /> */}
            </div>
        </div>
    );
}