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

  console.log({ arr })
  return (
    <>
      <section
        className={styles.sektion}
        style={{
          backgroundColor:
            `${
              arr.baggrundsfarve === 'Lys' ? 'var(--bg)' :
              arr.baggrundsfarve === 'Sand' ? 'var(--light)' :
              arr.baggrundsfarve === 'Gul' ? 'var(--yellow)' :
              arr.baggrundsfarve === 'Pink' ? 'var(--pink)' :
              arr.baggrundsfarve === 'Fersken' ? 'var(--peach)' :
              arr.baggrundsfarve === 'Roed' ? 'var(--red)' :
              arr.baggrundsfarve === 'Groen' ? 'var(--green)' :
              arr.baggrundsfarve === 'Blaa' ? 'var(--main)' :
              arr.baggrundsfarve === 'Sort' ? 'var(--black)' :
              ''
            }`
        }}
        >
        <div className={`
          ${styles.inner}
          ${ arr.align === 'left' ? `${styles.leftAligned}` : arr.align === 'right' ? `${styles.rightAligned}` : `${styles.centerAligned}`}
        `}>
          <motion.div
            initial='initial'
            whileInView='whileInView'
            variants={variants}
            viewport={{ once: true }}
            className={styles.col}>
            <h2
              className={styles.h2}>
              {arr.titel}
            </h2>
            <div
              className={styles.p}
              dangerouslySetInnerHTML={{ __html: `${arr.tekst.html}` }}
              ></div>
              { arr.cta &&
                <div
                  className={styles.cta}
                  onClick={() => router.push('/')}
                  >
                  <span className={styles.icon}>
                    <FeatherIcon
                      icon={arr.cta.ikon}
                      size={15}
                      style={{ color: 'var(--bg)' }}
                    />
                  </span>
                  <span>{arr.cta.label}</span>
                </div>
              }
          </motion.div>
          { arr.billede != null &&
            <motion.div
            initial='initial'
            whileInView='whileInView'
            variants={variants}
            viewport={{ once: true }}
            className={styles.col}>
            <div className={styles.wrapper}>
              { arr.align != 'center' ?
              <Image
                src={arr.billede.url}
                layout='responsive'
                height='440'
                width='400'
                objectFit='cover'
                objectPosition='center'
                alt={arr.billede.alt}
                quality='100'/>
                :
                <Image
                  src={arr.billede.url}
                  layout='responsive'
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
          </motion.div> }
        </div>
      </section>
    </>
  )
}
