// Default imports
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'

// SCSS Styling
import styles from '../styles/footer.module.scss'

//GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'


const itStyle = {
  color: 'var(--peach)',
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

export default function Footer() {
  const outer = useRef();
  const inner = useRef();
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(inner.current, {
      yPercent: -75
    },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        scrub: true,
        markers: true,
        trigger: outer.current,
        start: 'top bottom',
        end: 'bottom bottom'
      }
    })
  }, [])

  return (
    <>
      <footer className={styles.main} ref={outer}>
        <div className={styles.inner} ref={inner}>
          <div className={styles.tagline}>
            Vær med til at gøre Danmark til digital frontløber
          </div>
          <div className={styles.top}>
            <Contact />
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
