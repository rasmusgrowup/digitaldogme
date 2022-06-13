// Default imports
import Image from "next/image"
import Link from "next/link"
import { useState } from 'react'

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
      <section className={styles.publikationer}>
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
            { arr.map((publikation, i) => (
            <Link href='/' key={i}>
              <a className={styles.publikation}>
                <div
                  className={`
                    ${ filter === kategorier || publikation.type === filter ? `${styles.show}` : `${styles.hide}`}
                  `}
                  key={i}>
                  <div className={styles.wrapper}>
                    <Image
                      src={publikation.billede.url}
                      height='440'
                      width='400'
                      objectFit='cover'
                      objectPosition='center'
                      quality='100'
                      layout='responsive'
                    />
                  </div>
                  <span className={styles.dato}>{publikation.dato}</span>
                  <h3 className={styles.titel}>{publikation.titel}</h3>
                  <div
                    className={styles.p}
                    dangerouslySetInnerHTML={{ __html: `${publikation.beskrivelse.html}` }}
                    />
                </div>
              </a>
            </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
