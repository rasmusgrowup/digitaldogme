// Default imports
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'
import Moment from 'react-moment'
import 'moment/locale/da';

// SCSS Styling
import styles from '../styles/karussel.module.scss'

export default function Karussel({arr}) {
    const router = useRouter()
    console.log(arr)
    return (
        <>
            <div
                className={styles.container}>
                {arr.items.map((item, i) => (
                    <div className={styles.publikation} key={i}>
                        <Link href={
                            item.__typename === "Publikation" ? `${`/viden/${item.slug}`}` :
                            item.__typename === "Case" ? `${`/cases/${item.slug}`}` :
                            item.__typename === "Event" ? `${`/events/${item.slug}`}` : null
                        }
                              passHref>
                            <a>
                                <div className={styles.wrapper}>
                                    <Image
                                        alt={item.billede.alt ? item.billede.alt : ''}
                                        src={item.billede.url}
                                        height='400'
                                        width='400'
                                        objectFit='cover'
                                        objectPosition='center'
                                        quality='100'
                                        layout='responsive'
                                    />
                                </div>
                                <h3 className={styles.titel}>{item.titel}</h3>
                                <span className={styles.dato}>
                                  <Moment locale='da' format='ll'>
                                      {item.dato.toString()}
                                  </Moment>
                                </span>
                            </a>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
