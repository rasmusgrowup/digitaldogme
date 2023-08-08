// Default imports
import Link from "next/link"
import {useRouter} from 'next/router'
import {TWITTER, LINKEDIN} from '../lib/constants.js'

// SCSS Styling
import styles from '../styles/footer.module.scss'

//Components
import WhiteLogo from "../public/AltLogo_White_red.png";
import Image from "next/image";

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

function Navigation({menu}) {
    const router = useRouter()

    return (
        <div className={styles.navigation}>
            { menu.punkter.map((punkt, i) => (
                <ul key={i} className={styles.ul}>
                    <div className={styles.titel}>{punkt.titel}</div>
                    { punkt.dropdownLinks.length === 0 ?
                        <li>
                            <Link href={`/${punkt.link.slug}`}>Overblik</Link>
                        </li> :
                        <ul className={styles.li} key={i}>
                            {punkt.dropdownLinks.map((dropdown, i) => (
                                <li key={i}><Link href={dropdown.scrollToSection ? `/${dropdown.adresse}#${dropdown.scrollToSection.id}` : `/${dropdown.adresse}`}>{dropdown.titel}</Link></li>
                            ))}
                        </ul>
                    }
                </ul>
            ))}
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
            <span className={styles.copyright}>Digital Dogme ©{new Date().getFullYear()}</span>
        </div>
    )
}

function Socials() {
    return (
        <div className={styles.socials}>
            <Link href={TWITTER} passHref>
                <a target='_blank'>
                    Twitter
                </a>
            </Link>
            <Link href={LINKEDIN} passHref>
                <a target='_blank'>
                    LinkedIn
                </a>
            </Link>
        </div>
    )
}

function Policies() {
    return (
        <div className={styles.policies}>
            <Link href='/datapolitik'><a>Datapolitik</a></Link>
            <Link href='/presse-kit-guidelines'><a>Presse-kit & guidelines</a></Link>
        </div>
    )
}

export default function Footer({menu}) {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
        <>
            <footer className={styles.main}>
                <div className={styles.inner}>
                    <div className={styles.tagline} style={{display: 'none'}}>
                        Vær med til at gøre Danmark til digital frontløber
                    </div>
                    <div className={styles.top}>
                        {isDevelopment ? <Logo/> : <Logo/>}
                        <div className={styles.bar}>
                            <Navigation menu={menu}/>
                            {/* <Address/> */}
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <Info/>
                        <div className={styles.bottomBar}>
                            <Socials/>
                            <Policies />
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
