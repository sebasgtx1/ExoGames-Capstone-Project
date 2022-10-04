import { Card } from "./Card"
import datas from "./datas.json"
import styles from "./Grid.module.css"

export function GridEvents() {
    return (
        <ul className={styles.dataGrid}>
            <h1>Events</h1>
            {datas.map((data) => (
                <Card key={data.id} data={data}/>
            ))}
        </ul>
    );
}