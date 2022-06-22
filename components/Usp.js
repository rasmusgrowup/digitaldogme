// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/usp.module.scss'

// Framer motion
import { motion } from 'framer-motion';

// Feather icons
import FeatherIcon from 'feather-icons-react';

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
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2
    }
  }
}

const item = {
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 3,
      ease: [0.22, 1, 0.36, 1]
    }
   }
}

export default function Usp({ arr }) {

  return (
    <>
      <section className={`
        section
        ${styles.usp}
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
            arr.baggrundsfarve === null ? 'var(--bg)' :
            'var(--bg)'
          }`
      }}>
        <motion.div
          initial='initial'
          whileInView='whileInView'
          variants={variants}
          viewport={{ once: true }}
          className={styles.inner}>
          <h2 className={styles.h2}>{arr.overskriftUSP}</h2>
          <div
            className={styles.p}
            dangerouslySetInnerHTML={{ __html: `${arr.tekstUSP.html}` }}
          />
          <motion.div className={styles.grid}>
            { arr.sellingPoint.map((point, i) => (
              <motion.div
                variants={item}
                className={styles.point}
                key={i}>
                { point.ikon && <div className={styles.icon}>
                  <FeatherIcon
                    icon={point.ikon}
                    size={25}
                    style={{ color: 'var(--bg)' }}
                  />
                </div>}
                <div
                  className={styles.p}
                  dangerouslySetInnerHTML={{ __html: `${point.tekst.html}` }}
                />
              </motion.div>
            ))}
          </motion.div>
          { arr.callToAction &&
            <div
              className={styles.cta}
              onClick={() => router.push(`${arr.callToAction.link}`)}
              >
              <span className={styles.icon}>
                <FeatherIcon
                  icon={arr.callToAction.ikon}
                  size={15}
                  style={{ color: 'var(--bg)' }}
                />
              </span>
              <span>{arr.callToAction.label}</span>
            </div>
          }
        </motion.div>
      </section>
    </>
  )
}
