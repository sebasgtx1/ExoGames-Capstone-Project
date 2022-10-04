import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export function Card({ data }) {
    const imageUrl = "https://image.tmdb.org/t/p/w300" + data.poster_path;
    return (
    <li className={styles.dataCard}>
        <Link to={"/events/" + data.id}>
            <img 
            width={316}
            height={234}
            className={styles.dataImage}
            src={imageUrl}
            alt={data.title}/>
            <div>Id event : {data.id}</div>
            <div>Event name : {data.title}</div>
            <div>{data.original_title}</div>
            <div>Venue's name</div>
            <div>{data.release_date}</div>
        </Link>
    </li>);
}