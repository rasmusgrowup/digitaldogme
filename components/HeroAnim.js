// Default imports
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from 'react'

// Framer motion
import { motion, useAnimation } from 'framer-motion';

// Gsap
import { gsap } from 'gsap'

// SCSS Styling
import styles from '../styles/hero.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

const wordsList = [
  'kompetencer',
  'viden',
  'synlighed',
  'indsigt',
  'forandring'
]

export default function HeroAnim({ height, url, overskrift, tekst, alt }) {
  const [words, setWords ] = useState(wordsList)
  const ref = useRef()
  const a = gsap.utils.selector(ref)
  const master = useRef()
  const tl = useRef()

  useEffect(() => {
    master.current = gsap.timeline({ repeat: -1, repaetRefresh: true})

    gsap.set(a('.word'), { yPercent: 100})

    var el = gsap.utils.toArray('.word');
    el.forEach((element) => {
      var child = gsap.timeline()
      child
      .to(element, {
        yPercent: 0,
        duration: 0.6,
        ease: 'Power3.easeOut'
      })
      .to(element, {
        yPercent: 100,
        duration: 0.6,
        ease: 'Power3.easeIn',
        delay: 2,
      });
      master.current.add(child)
    })
  }, [])

  return (
    <>
      <section className={`
        ${styles.hero}
        ${ height === true ? `${styles.fullHeight}` : '' }
        `}>
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
            alt={alt}
          />
        </motion.div>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 3,
                delay: 0.8,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={styles.animatedH1}
              >
                <span className={styles.staticWords}>
                  Vi skaber
                </span>
                <span className={styles.dynamicWords} ref={ref}>
                  { words.map((word, i) => (
                    <div className={`word ${styles.wordWrapper}`} key={i}>
                      {word}
                    </div>
                  ))}
                </span>
              </motion.h1>
          </div>
          <div className={styles.wrapper}>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
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
              delay: 2,
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
