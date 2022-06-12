// Default imports
import Link from "next/link"
import { useRouter } from 'next/router'

// SCSS styles
import styles from '../styles/nav.module.scss'

// Components
import Menupunkt from '../components/Menupunkt'
import Button from '../components/Button'
import React, { useContext } from 'react'
import { MenuContext } from "../lib/menuContext"

// Feather icons
import FeatherIcon from 'feather-icons-react';

// GraphCMS
import { gql, request } from 'graphql-request';
import useSWR from 'swr'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

function MenuButton() {
  const { toggle, toggleFunction } = useContext(MenuContext);

  return (
    <button
    onClick={toggleFunction}
    className={`
      ${styles.menuButton}
      ${ toggle ? '' : `${styles.light}`}
      `}>
    { toggle ? 'Luk' : 'Menu'}
    </button>
  )
}

export default function Navigation() {
  const { toggle, toggleFunction } = useContext(MenuContext);
  const router = useRouter()

  const { data, error } = useSWR(`
    query fetchMenuPunkter {
      menu(where: {placering: header}) {
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
  if (!data) return <div className={styles.loading}><Button theme='light' label='... indlæser' href='/' /></div>

  return (
    <>
      <nav className={`
        ${styles.nav}
        ${ toggle ? `${styles.openMenu}` : `${styles.closeMenu}`}
        `}>
        <ul className={styles.ul}>
          { data.menu.punkter.map((punkt) => (
            <li
              onClick={toggleFunction}
              className={styles.li}
              key={punkt.id}>
              <Menupunkt
                title={punkt.titel}
                slug={`${ punkt.link.type === 'forside' ? '/' : `${punkt.link.slug}`}`}
                arr={punkt.dropdownLinks}
              />
            </li>
          ))}
        </ul>
        { data.menu.knapper.map((knap, i) => (
          <div className={styles.buttonWrapper} key={i}>
            <Button
            theme='light'
            label={knap.label}
            href={knap.adresse}
            key={knap.id}/>
          </div>
        ))}
        <div className={styles.socials}>
          <Link href='https://twitter.com'>
            <a>
              <FeatherIcon
                icon='twitter'
                size={15}
                style={{ color: 'var(--main)' }}
              />
              <span>Twitter</span>
            </a>
          </Link>
          <Link href='https://linkedin.com'>
            <a>
              <FeatherIcon
                icon='linkedin'
                size={15}
                style={{ color: 'var(--main)' }}
              />
              <span>LinkedIn</span>
            </a>
          </Link>
        </div>
        <div className={styles.legals}>
          <Link href='https://twitter.com'><a>Handelsbetingelser</a></Link>
          <Link href='https://linkedin.com'><a>GDPR</a></Link>
        </div>
      </nav>
      <MenuButton />
    </>
  )
}
