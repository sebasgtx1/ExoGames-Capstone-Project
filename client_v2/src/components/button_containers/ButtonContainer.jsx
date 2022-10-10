import stylesButton from "../styles/ButtonContainer.module.css"
import { Button } from "../reusables/Button";
import { SearchBar } from "../reusables/SearchBar";

export function ButtonContainer() {
    return (
        <div>
            <div className={stylesButton.center_div}>
                <ul className={stylesButton.dataButtons}>
                    <Button src="/events" title="Events"></Button>
                    <Button src="/venues" title="Venues"></Button>
                    <Button src="/competitors" title="Competitors"></Button>
                    <Button src="/my_events" title="Login"></Button>
                </ul>
            </div>
            <div>
                <SearchBar />
            </div>
        </div>
    );
}