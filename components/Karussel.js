// Default imports
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Moment from 'react-moment'
import 'moment/locale/da';

// SCSS Styling
import styles from '../styles/karussel.module.scss'

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

export default function Karussel({ arr }) {
  const router = useRouter()
  return (
    <>
      <section
        className={styles.karussel}
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
          <h2
            className={styles.h2}>
            {arr.overskriftKarussel}
          </h2>
          <div
            className={styles.container}>
            { arr.publikationer.map((publikation, i) => (
              <div className={styles.publikation} key={i}>
                <Link href={`/viden/${publikation.slug}`} passHref>
                  <a>
                    <div className={styles.wrapper}>
                      <Image
                        src={publikation.billede.url}
                        height='440'
                        width='400'
                        objectFit='cover'
                        objectPosition='center'
                        quality='100'
                        layout='responsive'
                      />
                    </div>
                    <span className={styles.dato}>
                      <Moment locale='da' format='ll'>
                          {publikation.dato.toString()}
                      </Moment>
                    </span>
                    <h3 className={styles.titel}>{publikation.titel}</h3>
                    <p className={styles.resume}>{publikation.resume}</p>
                  </a>
                </Link>
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
                  style={{ color: 'var(--bg)' }}
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
