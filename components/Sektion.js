// Default imports
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

// SCSS Styling
import styles from '../styles/sektion.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// Framer motion
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    y: 50
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
      delay: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Sektion({ arr }) {
  const router = useRouter()
  return (
    <>
      <section
        className={`
          section
          ${styles.sektion}
          ${ arr.baggrundsfarve ?
            `${styles.medBaggrundsfarve}` : '' }`}
        style={{
          backgroundColor:
            `${
              arr.baggrundsfarve === 'Lys' ? 'var(--bg)' :
              arr.baggrundsfarve === 'Sand' ? 'var(--sand)' :
              arr.baggrundsfarve === 'Gul' ? 'var(--yellow)' :
              arr.baggrundsfarve === 'Pink' ? 'var(--pink)' :
              arr.baggrundsfarve === 'Fersken' ? 'var(--peach)' :
              arr.baggrundsfarve === 'Roed' ? 'var(--red)' :
              arr.baggrundsfarve === 'Groen' ? 'var(--green)' :
              arr.baggrundsfarve === 'Blaa' ? 'var(--main)' :
              arr.baggrundsfarve === 'Sort' ? 'var(--black)' :
              arr.baggrundsfarve === 'Turkis' ? 'var(--turkis)' :
              arr.baggrundsfarve === 'Karry' ? 'var(--curry)' :
              arr.baggrundsfarve === null ? 'var(--bg)' :
              'var(--bg)'
            }`
        }}
        >
        <div
          className={`
          ${styles.inner}
          ${ arr.align === 'left' ? `${styles.leftAligned}` : arr.align === 'right' ? `${styles.rightAligned}` : `${styles.centerAligned}`}
        `}>
          <div className={styles.col}>
            { arr.titel ?
              <h2
                className={styles.h2}>
                {arr.titel}
              </h2>
              : <></>
            }
            <div
              className={styles.p}
              dangerouslySetInnerHTML={{ __html: `${arr.tekst.html}` }}
              />
              { arr.cta &&
                <Link className={styles.cta} href={arr.cta.link}>
                  <a className={styles.icon}>
                    {arr.cta.label}
                    <FeatherIcon
                      icon={arr.cta.ikon}
                      size={21}
                      style={{ color: 'var(--main)', marginBottom: '-1px', marginLeft: '0.2rem' }}
                    />
                  </a>
                </Link>
              }
          </div>
          { arr.billede != null &&
            <div className={styles.col}>
            <div
            style={{ maxWidth: `${ arr.maxBredde ? `${arr.maxBredde}px` : '100%' }`}}
            className={`
              ${styles.wrapper}
              ${ arr.align === 'center'
              ? `${styles.centered}`
              : '' }
              `}>
              { arr.align != 'center' ?
              <Image
                src={arr.billede.url}
                layout='responsive'
                height='400'
                width='400'
                objectFit='cover'
                objectPosition='center'
                alt={arr.billede.alt}
                quality='100'/>
                :
                <Image
                  src={arr.billede.url}
                  height={arr.billede.height}
                  width={arr.billede.width}
                  objectFit='cover'
                  objectPosition='center'
                  alt={arr.billede.alt}
                  quality='100'/>
              }
            </div>
            { arr.billede.caption &&
              <p className={styles.caption}>{arr.billede.caption}</p>
            }
          </div> }
        </div>
      </section>
    </>
  )
}
