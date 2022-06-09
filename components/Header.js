// Default imports
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'

// SCSS Styling
import styles from '../styles/header.module.scss'

// Components
import Navigation from '../components/Navigation'

const itStyle = {
  color: 'var(--pink)',
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
  const router = useRouter()

  return (
    <div className={styles.logo} onClick={() => router.push('/')}>
      <Digital />
      <Dogme />
    </div>
  )
}

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Logo />
          <Navigation />
        </div>
      </header>
    </>
  )
}
