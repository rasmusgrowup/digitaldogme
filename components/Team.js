// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/team.module.scss'

// Framer motion
import { motion } from 'framer-motion';

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Team({ arr }) {
  console.log({ arr })
  return (
    <>
      <section className={styles.team}>
        <div className={styles.inner}>
          <h3>{arr.overskriftTeam}</h3>
          <div className={styles.wrapper}>
            { arr.personer.map((person, i) => (
              <div className={styles.person} key={i}>
                <div className={styles.image}>
                  <Image
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
