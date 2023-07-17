// Default imports
import Link from "next/link"
import {useRouter} from 'next/router'

// SCSS styles
import styles from '../styles/nav.module.scss'

// Components
import Menupunkt from '../components/Menupunkt'
import React, {useContext} from 'react'
import {MenuContext} from "../lib/menuContext"
import {useMediaQuery} from 'react-responsive'

// GraphCMS
import {gql, request} from 'graphql-request';
import useSWR from 'swr'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

function MenuButton({scrolling}) {
    const {toggle, toggleFunction} = useContext(MenuContext);

    return (
        <button
            onClick={toggleFunction}
            className={`
              ${styles.menuButton}
              ${toggle || scrolling ? `${styles.dark}` : ''}
            `}>
            {toggle ? 'Luk' : 'Menu'}
        </button>
    )
}

function RegularLink({punkt, isSmall}) {
    const {toggleFunction} = useContext(MenuContext);

    return (
        <li
            onClick={isSmall ? toggleFunction : null}
            className={styles.li}
            key={punkt.id}>
            <Menupunkt
                title={punkt.titel}
                slug={punkt.link.type === 'forside' ? '' : `${punkt.link.slug}`}
                arr={[]}
            />
        </li>
    )
}

function DropdownLink({punkt, isSmall}) {
    return (
        <li
            className={styles.li}
            key={punkt.id}>
            <Menupunkt
                title={punkt.titel}
                arr={punkt.dropdownLinks}
                isSmall={isSmall}
            />
        </li>
    )
}

export default function Navigation({scrolling}) {
    const {toggle, toggleFunction} = useContext(MenuContext);
    const router = useRouter()
    const isSmall = useMediaQuery({
        query: '(max-width: 834px)'
    })

    const {data, error} = useSWR(`
    query fetchMenuPunkter {
      menu(where: {placering: dev}) {
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
              scrollToSection {
                ... on Grid {
                    id
                }
                ... on Section {
                    id
                }
                ... on Sektion {
                    id
                }
              }
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
    if (!data) return <div></div>

    //console.log(data)

    return (
        <>
            <nav className={`
                ${styles.nav}
                ${toggle ? `${styles.openMenu}` : `${styles.closeMenu}`}
                ${scrolling ? `${styles.scrolling}` : ''}
                `}>
                <div className={styles.inner}>
                    <ul className={styles.ul}>
                        {data.menu.punkter.map((punkt) => {
                            return punkt.dropdownLinks.length > 1 ?
                                <DropdownLink key={punkt.id} punkt={punkt} router={router} isSmall={isSmall}/> :
                                <RegularLink key={punkt.id} punkt={punkt} router={router} isSmall={isSmall}/>
                        })}
                    </ul>
                    {data.menu.knapper.map((knap) => (
                        <div className={styles.buttonWrapper} key={knap.id}>
                            <Link href={`/${knap.adresse}`} passHref>
                                <a className={styles.cta} onClick={isSmall ? toggleFunction : null}>
                                    {knap.label}
                                </a>
                            </Link>
                        </div>
                    ))}
                    <div className={styles.socials}>
                        {`Følg med i vores indsats for at styrke Danmarks digitale kompetencer på `}
                        <Link href='https://twitter.com' passHref>
                            <a>
                                <span>Twitter</span>
                            </a>
                        </Link>
                        {` og `}
                        <Link href='https://linkedin.com' passHref>
                            <a>
                                <span>LinkedIn</span>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.legals} style={{display: 'none'}}>
                        <Link href='https://twitter.com'><a>Handelsbetingelser</a></Link>
                        <Link href='https://linkedin.com'><a>GDPR</a></Link>
                    </div>
                </div>
            </nav>
            <MenuButton scrolling={scrolling}/>
        </>
    )
}
