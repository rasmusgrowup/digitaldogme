// Default imports
import Image from "next/image"
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
  const [loaded, setLoaded] = useState(false);
  const [words, setWords ] = useState(wordsList)
  const ref = useRef()
  const a = gsap.utils.selector(ref)
  const master = useRef()
  const tl = useRef()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoaded(true)
    }
  }, []);

  useEffect(() => {
    master.current = gsap.timeline({ repeat: -1, repaetRefresh: true, delay: 1})

    gsap.set(a('.word'), {
      xPercent: 0,
      yPercent: 120,
      x: 0,
      y: 0,
    })

    var el = gsap.utils.toArray('.word');
    el.forEach((element) => {
      var child = gsap.timeline()
      child
      .to(element, {
        yPercent: 0,
        duration: 0.4,
        ease: 'Power3.easeOut'
      })
      .to(element, {
        yPercent: 100,
        duration: 0.4,
        ease: 'Power3.easeIn',
        delay: 1.6,
      });
      master.current.add(child)
    })

    return () => {
      master.current.kill()
    }
  }, [])

  return (
    <>
      <section className={`
        ${styles.hero}
        ${ height === true ? `${styles.fullHeight}` : '' }
        `}>
        <div className={styles.image}>
          <Image
            src={url}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
            quality='100'
            priority='true'
            alt={alt}
          />
        </div>
        <div className={styles.contentAnimated}>
          <div className={styles.wrapper}>
            <h1 className={styles.animatedH1} style={ !loaded ? {display: 'none'} : {display: 'block'}}>
                <span>Digital Dogme.</span>
                <div className={styles.animatedWrapper}>
                  <span className={styles.staticWords}>
                  Vi skaber
                </span>
                  <span className={styles.dynamicWords} ref={ref}>
                  { words.map((word, i) => (
                      <div className={`word ${styles.wordWrapper}`} key={i}>
                        {word}<span style={{ color: 'var(--red)' }}>.</span>
                      </div>
                  ))}
                </span>
                </div>
              </h1>
          </div>
          {/* <div className={styles.wrapper}>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2.5,
                delay: 1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={styles.p}
              >
                {tekst}
              </motion.p>
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
          </motion.div> */}
        </div>
      </section>
    </>
  )
}
