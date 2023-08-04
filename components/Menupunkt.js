// Default imports
import Link from "next/link"
import { useState } from 'react'
import React, {useContext} from 'react'
import {MenuContext} from "../lib/menuContext"
import {useRouter} from "next/router";

// Styles imports
import styles from '../styles/nav.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Menupunkt({ slug, title, ikon, arr, isSmall }) {
  const {toggleFunction} = useContext(MenuContext);
  const [ visible, setVisible ] = useState(false)
  const router = useRouter();
  const toggleDropdown = () => {
    setVisible(!visible)
  }

  const toggleMenu = () => {
    toggleFunction()
  }

  return (
    <>
      { arr.length !== 0 ?
        <ul>
          <li>
            <span className={visible ? `${styles.container} ${styles.minus}` : `${styles.container} ${styles.plus}`} onClick={toggleDropdown}>
              {title}
              <div className={styles.icon}>
                <FeatherIcon
                    icon={visible ? 'chevron-up' : 'chevron-down'}
                    size={15}
                />
              </div>
            </span>
          </li>
          <li>
            <ul className={styles.dropdownList} style={{ display: `${visible ? 'block' : 'none' }`}}>
              { arr && arr.map((a, i) => (
                  <li key={a.id} className={styles.li} onClick={() => {toggleDropdown(); isSmall? toggleMenu() : null}}>
                    <Link href={a.scrollToSection ? `/${a.adresse}#${a.scrollToSection.id}` : a.params ? `/${a.adresse}${a.params}` : `/${a.adresse}`} passHref>
                      <a className={router.asPath === `${a.adresse}` && !a.scrollToSection ? `${styles.active}` : ``}>
                        <span>{a.titel}</span>
                      </a>
                    </Link>
                  </li>
              ))}
            </ul>
          </li>
        </ul>
        :
        <>
          <Link href={`/${slug}`} passHref>
            <a className={router.asPath === `/${slug}` ? `${styles.active}` : ``}>
              { ikon ?
                <>
                  <span>{title}</span>
                  <div className={styles.icon}>
                    <FeatherIcon
                      icon={ikon}
                      size={15}
                      style={{ color: 'var(--main)' }}
                    />
                  </div>
                </>
                :
                <><span>{title}</span></>
              }
            </a>
          </Link>
        </>
      }
    </>
  )
}
