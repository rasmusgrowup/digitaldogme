// Deafult imports
import Head from 'next/head'
import Image from 'next/image'

//Components
import Hero from '../components/Hero'
import Sektion from '../components/Sektion'
import Karussel from '../components/Karussel'
import Animeret from '../components/Animeret'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

// SCSS styles
import styles from '../styles/main.module.scss'

export async function getStaticProps() {
  const { side } = await graphcms.request(`
    query forside {
      side(where: {slug: "forside"}) {
        id
        slug
        titel
        type
        topSektion {
          ... on Hero {
            id
            billede {
              caption
              alt
              height
              url
              width
            }
            overskrift
            tekst
          }
        }
        blokke {
          __typename
          ... on Sektion {
            id
            billede {
              alt
              caption
              id
              url
              width
              height
            }
            baggrundsfarve
            align
            titel
            tekst {
              html
            }
            cta {
              id
              ikon
              label
            }
          }
          ... on USP {
            id
            overskriftUSP
          }
          ... on Karussel {
            id
            overskriftKarussel
            baggrundsfarve
            publikationer(where: {kategori: Cases}, first: 3) {
              billede {
                height
                id
                url
                width
              }
              dato
              id
              resume
              slug
              titel
            }
            cta {
              id
              ikon
              label
            }
          }
          ... on Animeret {
            id
            baggrundsfarve
            overskriftAnimeret
            tekstAnimeret
            tal {
              betydning
              id
              tal
            }
            cta {
              id
              ikon
              label
            }
          }
        }
      }
    }
  `);

  return {
    props: {
      side
    }
  }
}

function Content({ blokke }) {
  return (
    <>
      <div className={styles.content}>
      { blokke.map((blok, i) => (
          blok.__typename === 'Sektion' ?
          <Sektion arr={blok} key={blok.id}/> :
          blok.__typename === 'Animeret' ?
          <Animeret arr={blok} key={blok.id}/> :
          blok.__typename === 'Karussel' ?
          <Karussel arr={blok} key={blok.id}/> :
          blok.__typename === 'USP' ?
          <></> :
          null
        )) }
      </div>
    </>
  )
}

export default function Home({ side }) {
  return (
    <>
      <Hero
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
      />
      <Content blokke={side.blokke}/>
    </>
  )
}
