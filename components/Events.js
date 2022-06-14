// Default imports
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import 'moment/locale/da';

// Components
import Button from '../components/Button'

// SCSS Styling
import styles from '../styles/publikationer.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// Framer motion
import { motion } from 'framer-motion';

export default function Events({ arr, types }) {
  const [ kategorier, setKategorier ] = useState(types.enumValues);
  const [ filter, setFilter ] = useState(kategorier);

  return (
    <>
      <section className={styles.events}>
        <div className={styles.inner}>
          <p className={styles.p}>Filtrér i publikationerne</p>
          <div className={styles.filter}>
            <button
              className={`
              ${styles.kategori}
              ${ filter === kategorier && `${styles.selected}`}`}
              onClick={() => setFilter(kategorier)}
            >
              Alle
            </button>
            { kategorier.map((kategori, i) => (
              <button
                key={i}
                className={`
                  ${styles.kategori}
                  ${ kategori.name === filter && `${styles.selected}`}
                  `}
                onClick={() => setFilter(kategori.name)}
              >
                {kategori.name}
              </button>
            )) }
          </div>
          <div className={styles.grid}>
            { arr.map((event, i) => (
              <div  className={`
                ${styles.event}
                ${ filter === kategorier || event.type === filter ?
                  `${styles.show}` : `${styles.hide}`}
                `} key={i}>
              <Link href={`/events/${event.slug}`}>
                <a>
                    <div className={styles.wrapper}>
                      <Image
                        src={event.billede.url}
                        height='440'
                        width='400'
                        objectFit='cover'
                        objectPosition='center'
                        quality='100'
                        layout='responsive'
                      />
                    </div>
                    <span className={styles.dato}>
                      <Moment locale='da' format='lll'>
                          {event.dato.toString()}
                      </Moment>
                    </span>
                    <h3 className={styles.titel}>{event.titel}</h3>
                    <p className={styles.resume}>{event.resume}</p>
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
