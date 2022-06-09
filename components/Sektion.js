// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/sektion.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Sektion({ arr }) {
  console.log({ arr })

  return (
    <>
      <section className={styles.sektion}>
        <div className={styles.inner}>
          <h2>{arr.titel}</h2>
          <div dangerouslySetInnerHTML={{ __html: `${arr.tekst.html}` }}></div>
        </div>
      </section>
    </>
  )
}
