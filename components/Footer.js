// Default imports
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react'

// SCSS Styling
import styles from '../styles/footer.module.scss'

//Components
import Menupunkt from '../components/Menupunkt'

//GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// GraphCMS
import { gql, request } from 'graphql-request';
import useSWR from 'swr'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

const itStyle = {
  color: 'var(--red)',
}

function Digital() {
  return (
    <span className={styles.digital}>
      Dig<span style={itStyle}>it</span>al<br />
    </span>
  )
}

function Dogme() {
  return (
    <span className={styles.dogme}>
      Dogme
    </span>
  )
}

function Logo() {
  return (
    <div className={styles.logo}>
      <Digital />
      <Dogme />
    </div>
  )
}

function Contact() {
  return (
    <div className={styles.contact}>
      <p className={styles.titel}>Kontakt os på</p>
      <Link href='https://twitter.com'>
        <a className={styles.mail}>kontakt@digitaldogme.dk</a>
      </Link>
      <p className={styles.p}>Vi svarer man-fredag fra 8.00 - 16.30</p>
    </div>
  )
}

function Navigation() {
  const router = useRouter()
  const { data, error } = useSWR(`
    query fetchMenuPunkter {
      menu(where: {placering: header}) {
        punkter {
          ... on Menupunkt {
            id
            titel
            link {
              slug
              titel
              type
            }
            dropdownLinks {
              adresse
              ikon
              id
              titel
            }
          }
        }
        knapper {
          adresse
          ikon
          id
          label
        }
      }
    }
`, fetcher)

  if (error) return <div>Der skete en fejl</div>
  if (!data) return <div>Indlæser...</div>

  return (
    <div className={styles.navigation}>
      <ul className={styles.ul}>
        { data.menu.punkter.map((punkt) => (
          <li className={`
            ${styles.li}
            ${ router.pathname  === punkt.link.slug && `${styles.active}`}
            ${ router.pathname === '/' && punkt.link.type === 'forside' && `${styles.active}`}`}
            key={punkt.id}>
            <Menupunkt
              title={punkt.titel}
              slug={punkt.link.slug}
              arr={punkt.dropdownLinks}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

function Address() {
  return (
    <div className={styles.address}>
      <p>
        Att.: Digital Dogme<br/>
        c/o Netcompany
      </p>
      <p>
        Rued Langgardsvej 8<br/>
        DK-2300 København
      </p>
      <p>
        CVR 40984909<br/>
        EAN 5797200039583
      </p>
    </div>
  )
}

function Info() {
  return (
    <div className={styles.info}>
      <Logo />
      <span className={styles.copyright}>©{new Date().getFullYear()}</span>
    </div>
  )
}

function Socials() {
  return (
    <div className={styles.socials}>
      <Link href='https://twitter.com'><a>Twitter</a></Link>
      <Link href='https://linkedin.com'><a>LinkedIn</a></Link>
    </div>
  )
}

function Policies() {
  return (
    <div className={styles.policies}>
      <Link href='https://twitter.com'><a>Handelsbetingelser</a></Link>
      <Link href='https://linkedin.com'><a>GDPR</a></Link>
    </div>
  )
}

export default function Footer() {
  return (
    <>
      <footer className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.tagline} style={{ display: 'none' }}>
            Vær med til at gøre Danmark til digital frontløber
          </div>
          <div className={styles.top}>
            <Contact />
            <Navigation />
            <Address />
          </div>
          <div className={styles.bottom}>
            <Info />
            <Socials />
            <Policies />
          </div>
        </div>
      </footer>
    </>
  )
}
