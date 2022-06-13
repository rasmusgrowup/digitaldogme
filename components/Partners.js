// Default imports
import Image from "next/image"
import Link from "next/link"

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
  return (
    <>
      <section className={`
        section
        ${styles.partners}
        `}>
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
            <motion.div
              className={styles.grid}>
              { arr.partnere.map((partner, i) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  variants={item}
                  className={styles.partner}
                  key={i}>
                  <Link href={partner.website}>
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
        </motion.div>
      </section>
    </>
  )
}
