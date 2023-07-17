// Default imports
import Link from "next/link"
import {useRouter} from 'next/router'
import {useState, useRef, useEffect} from 'react'
import {TWITTER, LINKEDIN} from '../lib/constants.js'

// SCSS Styling
import styles from '../styles/footer.module.scss'

//Components
import Menupunkt from '../components/Menupunkt'
import LinkedIn from '../components/icons/LinkedIn'
import Twitter from '../components/icons/Twitter'
import WhiteLogo from "../public/AltLogo_White.png";

// Feather icons
import FeatherIcon from 'feather-icons-react';

// GraphCMS
import {gql, request} from 'graphql-request';
import useSWR from 'swr'
import {MenuContext} from "../lib/menuContext";
import Image from "next/image";

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

const itStyle = {
    color: 'var(--red)',
}

function Digital() {
    return (
        <span className={styles.digital}>
      Dig<span style={itStyle}>it</span>al<br/>
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
            <Digital/>
            <Dogme/>
        </div>
    )
}

function AltLogo() {
    return (
        <div className={styles.altLogo}>
            <Image src={WhiteLogo}/>
        </div>
    )
}

function Navigation() {
    const router = useRouter()
    const {data, error} = useSWR(`
    query fetchMenuPunkter {
      menu(where: {placering: footer}) {
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
                {data.menu.punkter.map((punkt) => (
                    <li className={`
            ${styles.li}
            ${router.asPath === `/${punkt.link.slug}`
                        ? `${styles.active}`
                        : ''
                    }
            `}
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

function Address({children}) {
    return (
        <div className={styles.address}>
            <p>
                Digital Dogme<br/>
                C/O Netcompany
            </p>
            <p>
                Strandgade 3<br/>
                1401 København K.
            </p>
            {children}
        </div>
    )
}

function Info() {
    return (
        <div className={styles.info}>
            <span className={styles.copyright}>©{new Date().getFullYear()} Digital Dogme</span>
        </div>
    )
}

function Socials() {
    return (
        <div className={styles.socials}>
            <Link href={TWITTER} passHref>
                <a>
                    <Twitter/>
                </a>
            </Link>
            <Link href={LINKEDIN} passHref>
                <a>
                    <LinkedIn/>
                </a>
            </Link>
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
    const isDevelopment = process.env.NODE_ENV === 'development';
    return (
        <>
            <footer className={styles.main}>
                <div className={styles.inner}>
                    <div className={styles.tagline} style={{display: 'none'}}>
                        Vær med til at gøre Danmark til digital frontløber
                    </div>
                    <div className={styles.top}>
                        {isDevelopment ? <AltLogo/> : <Logo/>}
                        <Navigation/>
                        <Address/>
                    </div>
                    <div className={styles.bottom}>
                        <Info/>
                        <Socials/>
                    </div>
                </div>
            </footer>
        </>
    )
}
