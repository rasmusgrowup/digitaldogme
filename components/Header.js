// Default imports
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import WhiteLogo from '/public/AltLogo_White.png'
import DarkLogo from '/public/AltLogo_Dark.png'

// SCSS Styling
import styles from '../styles/header.module.scss'

// Components
import Navigation from '../components/Navigation'
import React, { useContext } from 'react'
import { MenuContext } from "../lib/menuContext"
import useScrollListener from '../lib/useScroll'
import Image from "next/image";

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

function Logo({ scrolling }) {
  const router = useRouter()
  const { toggle, toggleFunction } = useContext(MenuContext);

  const click = () => {
    router.push('/')
    if (toggle === true) {
      toggleFunction()
    }
  }
  return (
    <div className={`
      ${styles.logo}
      ${ toggle ? `${styles.menuOpened}` : '' }
      ${ scrolling ? `${styles.isScrolling}` : '' }
      `}
      onClick={click}>
      <Digital />
      <Dogme />
    </div>
  )
}

function AltLogo({ scrolling }) {
    const { toggle } = useContext(MenuContext);

    return (
        <div className={styles.altLogo}>
            { !scrolling && !toggle ? <Image src={WhiteLogo} /> : toggle ? <Image src={DarkLogo} /> : <Image src={DarkLogo} />}
        </div>
    )
}

export default function Header() {
  const router = useRouter()
  const [navClassList, setNavClassList] = useState([]);
  const [ scrolling, setScrolling ] = useState(false);
  const scroll = useScrollListener();
  const { toggle, toggleFunction } = useContext(MenuContext);

  useEffect(() => {
      const _classList = [];

      if (scroll.y < 1) {
        _classList.push(`${styles.atTop}`)
        setScrolling(false)
      }
      else {
          _classList.push(`${styles.whiteHeader}`);
        setScrolling(true)
      }

      //if (scroll.y > 100 && scroll.y - scroll.lastY > 0 && toggle != true)
      //  _classList.push(`${styles.hideHeader}`)

      setNavClassList(_classList);

      return () => {
        _classList.push(`${styles.atTop}`)
        setScrolling(false)
      }
    }, [scroll.y]);

    useEffect(() => {
        toggle
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'auto');
    }, [toggle]);

  return (
    <>
      <header className={`${styles.header} ${navClassList.join(' ')}`}>
        <div className={styles.inner}>
          <Logo scrolling={scrolling} />
          <Navigation scrolling={scrolling} />
        </div>
      </header>
    </>
  )
}
