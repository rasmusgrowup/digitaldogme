// Default imports
import Image from "next/image"
import Link from "next/link"

// Framer motion
import { motion } from 'framer-motion';

// SCSS Styling
import styles from '../styles/hero.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Hero({ url, overskrift, tekst }) {
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
            quality='100'
            priority='true'
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{
              duration: 4,
              delay: 4,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={styles.mere}>
            <div>Læs mere</div>
            <FeatherIcon
              icon='arrow-down'
              size={21}
              style={{ color: 'var(--bg)' }}
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
