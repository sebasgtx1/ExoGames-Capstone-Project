import { useEffect, useState } from "react";
import { get } from "../utils/httpClient";
import { Card } from "./Card"
import styles from "./Grid.module.css"

export function Grid() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        get("/discover/movie").then((data) => {
        setDatas(data.results);
        });
    }, []);
    return (
        <ul className={styles.dataGrid}>
            {datas.map((data) => (
                <Card key={data.id} data={data}/>
            ))}
        </ul>
    );
}