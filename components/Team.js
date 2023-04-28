// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/team.module.scss'

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
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Team({ arr }) {

  return (
    <>
      <section className={styles.team}>
        <motion.div
        initial='initial'
        whileInView='whileInView'
        variants={variants}
        viewport={{ once: true }}
        className={styles.inner}>
          <h3>{arr.overskriftTeam}</h3>
          <div className={styles.wrapper}>
            { arr.personer.map((person, i) => (
              <div className={styles.person} key={i}>
                <div className={styles.image}>
                  <Image
                      alt={person.billedePerson.alt}
                    src={person.billedePerson.url}
                    height='200'
                    width='200'
                    objectFit='cover'
                    objectPosition='center'
                    quality='100'
                  />
                </div>
                <h4 className={styles.h4}>{person.navn}</h4>
                <p className={styles.p}>{person.jobtitel}</p>
                { person.mailadresse &&
                  <Link href={`mailto: ${person.mailadresse}`}>
                    <a>{person.mailadresse}</a>
                  </Link>
                }
                { person.telefonnummer &&
                  <Link href={`mailto: ${person.telefonnummer}`}>
                    <a>+45 {person.telefonnummer}</a>
                  </Link>
                }
                { person.linkedIn &&
                  <Link href={person.linkedIn} passHref>
                    <a className={styles.linkedin}>
                      <FeatherIcon icon='linkedin' size={17} style={{ color: 'var(--main)' }} />
                      <span>LinkedIn</span>
                    </a>
                  </Link>
                }
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
