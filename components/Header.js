// Default imports
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import WhiteLogo from '/public/AltLogo_White.png'
import DarkLogo from '/public/AltLogo_Dark_red.png'

// SCSS Styling
import styles from '../styles/header.module.scss'

// Components
import Navigation from '../components/Navigation'
import React, {useContext} from 'react'
import {MenuContext} from "../lib/menuContext"
import useScrollListener from '../lib/useScroll'
import Image from "next/image";

const itStyle = {
    color: 'var(--red)',
}

function Digital() {
    return (
        <span className={styles.digital}>Digital<br/></span>
    )
}

function Dogme() {
    return (
        <span className={styles.dogme}>
      Dogme
    </span>
    )
}

function Logo({scrolling}) {
    const router = useRouter()
    const {toggle, toggleFunction} = useContext(MenuContext);

    const click = () => {
        router.push('/')
        if (toggle === true) {
            toggleFunction()
        }
    }
    return (
        <div className={`
      ${styles.logo}
      ${toggle ? `${styles.menuOpened}` : ''}
      ${scrolling ? `${styles.isScrolling}` : ''}
      `}
             onClick={click}>
            <Digital/>
            <Dogme/>
        </div>
    )
}

function AltLogo({scrolling}) {
    const router = useRouter()
    const {toggle, toggleFunction} = useContext(MenuContext);

    const click = () => {
        router.push('/')
        if (toggle) {
            toggleFunction()
        }
    }

    return (
        <div className={styles.altLogo} onClick={click}>
            {!scrolling && !toggle ? <Image src={WhiteLogo}/> : toggle ? <Image src={DarkLogo}/> :
                <Image src={DarkLogo}/>}
        </div>
    )
}

export default function Header({ hasHero, menu, theme }) {
    const router = useRouter()
    const [navClassList, setNavClassList] = useState([]);
    const [scrolling, setScrolling] = useState(false);
    const scroll = useScrollListener();
    const {toggle} = useContext(MenuContext);
    const isDevelopment = process.env.NODE_ENV === 'development';

    useEffect(() => {
        const _classList = [];

        if (scroll.y < 50 && hasHero) {
            _classList.push(`${styles.atTop}`)
            setScrolling(false)
        } else if (!hasHero) {
            _classList.push(`${styles.whiteHeader}`);
            setScrolling(true)
        }
        else {
            _classList.push(`${styles.whiteHeader}`);
            setScrolling(true)
        }

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
            <header className={`
                ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'sand' ? `${styles.sand}` : theme === 'curry' ? `${styles.curry}` : theme === 'green' ? `${styles.green}` : `${styles.dark}`}
                ${styles.header} ${navClassList.join(' ')}
                `}>
                <div className={styles.inner}>
                    { isDevelopment ? <Logo scrolling={scrolling}/> : <Logo scrolling={scrolling}/>}
                    <Navigation menu={menu} scrolling={scrolling} theme={theme}/>
                </div>
            </header>
        </>
    )
}
