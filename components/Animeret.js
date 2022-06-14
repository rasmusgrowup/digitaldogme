// Default imports
import Image from "next/image"
import Link from "next/link"
import { useRef } from 'react'

// SCSS Styling
import styles from '../styles/animeret.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// Countup
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

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

export default function Animeret({ arr }) {
  console.log({ arr })
  return (
    <>
      <section
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
            arr.baggrundsfarve === 'Turkis' ? 'var(--turkis)' :
            arr.baggrundsfarve === null ? 'var(--bg)' :
            'var(--bg)'
          }`,
          backgroundImage: `${ arr.baggrundsbillede ? `url(${arr.baggrundsbillede.url})` : '' }`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
      }}
      className={`
        section
        ${styles.animeret}
        ${ arr.baggrundsfarve === 'Roed' || arr.baggrundsfarve === 'Blaa' || arr.baggrundsfarve === 'Roed' || arr.baggrundsfarve === 'Groen' || arr.baggrundsfarve === 'Sort' || arr.baggrundsbillede ? `${styles.dark}` : ''}
      `}>
        <motion.div
          initial='initial'
          whileInView='whileInView'
          variants={variants}
          viewport={{ once: true }}
          className={styles.inner}>
          <h2 className={styles.h2}>
            {arr.overskriftAnimeret}
          </h2>
          <div className={styles.container}>
            { arr.tal.map((item, i) => (
              <div className={styles.item} key={i}>
                <div className={styles.tal}>
                  <VisibilitySensor
                    partialVisibility
                    offset={{ bottom: 30 }}>
                    {({ isVisible }) => (
                      <div className={styles.countup}>
                        {isVisible ?
                          <CountUp
                          useEasing='true'
                          end={item.tal}
                          duration={2.5}
                          delay={0.5}
                          />
                          :
                          '0'}
                      </div>
                    )}
                  </VisibilitySensor>
                  <span className={styles.enhed}>{item.enhed}</span>
                </div>
                <div className={styles.betydning}>
                  {item.betydning}
                </div>
              </div>
            ))}
          </div>
          { arr.cta &&
            <div
              className={styles.cta}
              onClick={() => router.push(`${arr.cta.link}`)}
              >
              <span className={styles.icon}>
                <FeatherIcon
                  icon={arr.cta.ikon}
                  size={15}
                  style={ arr.baggrundsbillede ? {color: 'var(--main)'} : {color: 'var(--bg)' }}
                />
              </span>
              <span>{arr.cta.label}</span>
            </div>
          }
        </motion.div>
      </section>
    </>
  )
}
