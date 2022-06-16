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
import { isMobileOnly } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// GraphCMS
import { gql, request } from 'graphql-request';
import useSWR from 'swr'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

function MenuButton({ scrolling }) {
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

export default function Navigation({ scrolling }) {
  const { toggle, toggleFunction } = useContext(MenuContext);
  const router = useRouter()
  const isSmall = useMediaQuery({
    query: '(max-width: 834px)'
  })

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
        ${ scrolling ? `${styles.scrolling}` : '' }
        `}>
        <ul className={styles.ul}>
          { data.menu.punkter.map((punkt) => (
            <li
              onClick={ isSmall ? toggleFunction : null }
              className={`
                ${styles.li}
                ${ router.asPath === `/${punkt.link.slug}`
                  ? `${styles.active}`
                  : ''
                }
                `}
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
            <Link href={`/${knap.adresse}`} passHref>
              <a onClick={ isSmall ? toggleFunction : null }>
                <Button
                theme='light'
                label={knap.label}
                key={knap.id}
                onClick={toggleFunction}
                />
              </a>
            </Link>
          </div>
        ))}
        <div className={styles.socials}>
          <Link href='https://twitter.com' passHref>
            <a>
              <FeatherIcon
                icon='twitter'
                size={15}
                style={{ color: 'var(--main)' }}
              />
              <span>Twitter</span>
            </a>
          </Link>
          <Link href='https://linkedin.com' passHref>
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
        <div className={styles.legals} style={{ display: 'none' }}>
          <Link href='https://twitter.com'><a>Handelsbetingelser</a></Link>
          <Link href='https://linkedin.com'><a>GDPR</a></Link>
        </div>
      </nav>
      <MenuButton />
    </>
  )
}
