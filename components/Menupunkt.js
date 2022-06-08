// Default imports
import Link from "next/link"
import { useState } from 'react'

// Styles imports
import styles from '../styles/link.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Menupunkt({ slug, title, icon, arr }) {
  const [ visible, setVisible ] = useState(false)
  const toggle = () => {
    setVisible(!visible)
  }

  console.log({arr})

  return (
    <>
      { arr.length !== 0 ?
        <>
          <span className={styles.container} onClick={toggle}>
            {title}
            <div className={styles.icon}>
              <FeatherIcon
                icon={icon}
                size={15}
                style={{ color: 'var(--main)' }}
              />
            </div>
          </span>
          <ul className={styles.dropdownList} style={{ display: `${visible ? 'block' : 'none' }`}}>
            { arr.map((a, i) => (
              <li key={i} className={styles.li}>
                <Link href={a.adresse}>
                  <a className={styles.link}>
                    { a.icon ?
                      <>
                        <span>{a.titel}</span>
                        <div className={styles.icon}>
                          <FeatherIcon
                            icon={a.icon}
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
          <Link href={slug}>
            <a className={styles.link}>
              { icon ?
                <>
                  <span>{title}</span>
                  <div className={styles.icon}>
                    <FeatherIcon
                      icon={icon}
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
