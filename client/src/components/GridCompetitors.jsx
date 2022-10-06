import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { get } from "../utils/httpClient";
import stylesGrid from "./Grid.module.css"
import stylesCard from './Card.module.css'


export function GridCompetitors() {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        get("/discover/movie").then((data) => {
        setDatas(data.results);
        });
    }, []);
    return (
        <ul className={stylesGrid.dataGrid}>
            {datas.map((data) => (
                <li key={data.id} className={stylesCard.dataCard}>
                    <Link to={"/competitors/" + data.id}>
                        <img 
                        width={316}
                        height={234}
                        className={stylesCard.dataImage}
                        src={"https://image.tmdb.org/t/p/w300" + data.poster_path}
                        alt={data.title}/>
                        <div>Id event : {data.id}</div>
                        <div>Event name : {data.title}</div>
                        <div>{data.original_title}</div>
                        <div>Venue's name</div>
                        <div>{data.release_date}</div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}