// Default imports
import Image from "next/image"
import Link from "next/link"

// Framer motion
import { motion, useViewportScroll } from 'framer-motion';

// SCSS Styling
import styles from '../styles/hero.module.scss'

export default function Hero({ url, overskrift, tekst }) {
  const { scrollYProgress} = useViewportScroll()

  return (
    <>
      <section className={styles.hero}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            delay: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={styles.image}
          >
          <Image
            src={url}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        </motion.div>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <motion.h1
              initial={{ y: 90 }}
              animate={{ y: 0 }}
              transition={{
                duration: 3,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={styles.h1}
              >
                {overskrift}
              </motion.h1>
          </div>
          <div className={styles.wrapper}>
            <motion.h2
              initial={{ y: 120, }}
              animate={{ y: 0 }}
              transition={{
                duration: 2.5,
                delay: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={styles.h2}
              >
                {tekst}
              </motion.h2>
          </div>
        </div>
      </section>
    </>
  )
}
