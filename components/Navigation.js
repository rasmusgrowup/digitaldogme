// Default imports
import { useRouter } from 'next/router'

// SCSS styles
import styles from '../styles/nav.module.scss'

// Components
import Menupunkt from '../components/Menupunkt'
import Button from '../components/Button'

// GraphCMS
import { gql, request } from 'graphql-request';
import useSWR from 'swr'

const fetcher = query => request('https://api-eu-central-1.graphcms.com/v2/cl41227n82mr701xjefvp5ghq/master', query)

export default function Navigation() {
  const router = useRouter()
  const { data, error } = useSWR(`
    query fetchMenuPunkter {
      menu(where: {placering: header}) {
        punkter {
          ... on Menupunkt {
            id
            dropdownLinks {
              adresse
              icon
              id
              titel
            }
            link {
              adresse
              icon
              titel
              id
            }
            titel
          }
        }
        knapper {
          adresse
          id
          label
        }
      }
    }
`, fetcher)

  if (error) return <div>Der skete en fejl</div>
  if (!data) return <div>Indlæser...</div>

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          { data.menu.punkter.map((punkt) => (
            <li className={`${styles.li} ${ router.pathname === punkt.link.adresse ? `${styles.active}` : '' }`} key={punkt.id}>
              <Menupunkt
                title={punkt.titel}
                slug={punkt.link.adresse}
                icon={punkt.link.icon}
                arr={punkt.dropdownLinks}
              />
            </li>
          ))}
        </ul>
        { data.menu.knapper.map((knap) => (
          <Button label={knap.label} href={knap.adresse} key={knap.id}/>
        ))}
      </nav>
    </>
  )
}
