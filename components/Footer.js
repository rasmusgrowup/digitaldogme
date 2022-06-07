// Default imports
import Link from "next/link"

// SCSS Styling
import styles from '../styles/footer.module.scss'

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
        <div className={styles.tagline}>
          Vær med til at gøre Danmark til digital frontløber
        </div>
        <div className={styles.top}>

        </div>
        <div className={styles.bottom}>
          <Info />
          <Socials />
          <Policies />
        </div>
      </footer>
    </>
  )
}
