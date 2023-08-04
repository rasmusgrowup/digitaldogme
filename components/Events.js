// Default imports
import Image from "next/image"
import Link from "next/link"
import {useState} from 'react'
import Moment from 'react-moment'
import 'moment/locale/da';


// SCSS Styling
import styles from '../styles/publikationer.module.scss'

export default function Events({arr, types}) {
    const [kategorier, setKategorier] = useState(types.enumValues);
    const [filter, setFilter] = useState(kategorier);
    const count = {};

    arr.forEach((item) => {
        const { type } = item;
        count[type] = (count[type] || 0) + 1;
    });

    console.log(count)

    return (
        <>
            <section className={styles.events}>
                <div className={styles.inner}>
                    {/* <p className={styles.p}>Filtrér i events</p> */}
                    <div className={styles.filter}>
                        <button className={`${styles.kategoriBtn} ${filter === kategorier && `${styles.selected}`}`}
                                onClick={() => setFilter(kategorier)}>
                            Alle <sup>({arr.length})</sup>
                        </button>
                        {kategorier.map((kategori, i) => (
                            <button key={i} className={`${styles.kategoriBtn} ${kategori.name === filter && `${styles.selected}`}`} onClick={() => setFilter(kategori.name)}>
                                {
                                    kategori.name === 'Workshop' ?
                                        'Workshops' :
                                        kategori.name === 'Network' ?
                                            'Netværk' :
                                            kategori.name === 'Konference' ?
                                                'Konferencer' :
                                                kategori.name === 'Medlemsevent' ?
                                                    'Medlemsevents' : null
                                }
                                {` `}{count[kategori.name] && <sup>({count[kategori.name]})</sup>}
                            </button>
                        ))}
                    </div>
                    <div className={styles.grid}>
                        {arr.map((event, i) => (
                            <div className={`${styles.event} ${filter === kategorier || event.type === filter ? `${styles.show}` : `${styles.hide}`}`} key={i}>
                                <Link href={`/events/${event.slug}`} passHref>
                                    <a>
                                        <div className={styles.wrapper}>
                                            <Image
                                                alt={event.billede.alt}
                                                src={event.billede.url}
                                                height='400'
                                                width='400'
                                                objectFit='cover'
                                                objectPosition='center'
                                                quality='100'
                                                layout='responsive'
                                            />
                                        </div>
                                        <h3 className={styles.titel}>{event.titel}</h3>
                                        <span className={styles.dato}><Moment locale='da' format='ll'>{event.dato.toString()}</Moment></span>
                                        { /* <p className={styles.resume}>{event.resume}</p> */}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
