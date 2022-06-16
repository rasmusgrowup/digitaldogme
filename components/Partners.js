// Default imports
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

// SCSS Styling
import styles from '../styles/partners.module.scss'

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

export default function Partners({ arr }) {
  const router = useRouter()

  return (
    <>
      <section className={`
        section
        ${styles.partners}
        `}
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
        }}
        >
        <motion.div
          initial='initial'
          whileInView='whileInView'
          variants={variants}
          viewport={{ once: true }}
          className={styles.inner}>
          <h2 className={styles.h2}>{arr.overskrift}</h2>
          <div
            className={styles.p}
            dangerouslySetInnerHTML={{ __html: `${arr.tekstPartner.html}` }}
            ></div>
            <motion.div
              className={styles.grid}>
              { arr.partnere.map((partner, i) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variants={item}
                  className={styles.partner}
                  key={i}>
                  <Link href={partner.website} passHref>
                    <a target='_blank'>
                      <Image
                        src={partner.billede.url}
                        height={partner.billede.height}
                        width={partner.billede.width}
                        alt={partner.billede.alt}
                      />
                    </a>
                  </Link>
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
