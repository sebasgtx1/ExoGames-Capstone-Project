import { Card } from "./Card"
import datas from "./datas.json"
import styles from "./Grid.module.css"

export function GridVenues() {
    return (
        <ul className={styles.dataGrid}>
            {datas.map((data) => (
                <Card key={data.id} data={data}/>
            ))}
        </ul>
    );
}