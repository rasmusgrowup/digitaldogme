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
        <>
          <span className={visible ? `${styles.container} ${styles.minus}` : `${styles.container} ${styles.plus}`} onClick={toggleDropdown}>
            {title}
            { !isSmall &&
                <div className={styles.icon}>
                  <FeatherIcon
                      icon={visible ? 'chevron-up' : 'chevron-down'}
                      size={15}
                  />
                </div>
            }
          </span>
          <ul className={styles.dropdownList} style={{ display: `${visible ? 'block' : 'none' }`}}>
            { arr.map((a, i) => (
              <li key={a.id} className={styles.li} onClick={() => {toggleDropdown(); isSmall? toggleMenu() : null}}>
                <Link href={`/${a.adresse}`} passHref>
                  <a className={router.asPath === `/${a.adresse}` ? `${styles.active}` : ``}>
                    { a.icon ?
                      <>
                        <span>{a.titel}</span>
                        <div className={styles.icon}>
                          <FeatherIcon
                            icon={a.ikon}
                            size={15}
                            style={{ color: 'var(--main)' }}
                          />
                        </div>
                      </>
                      :
                      <><span>{a.titel}</span></>
                    }
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </>
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
