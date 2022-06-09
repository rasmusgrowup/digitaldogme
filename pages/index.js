// Deafult imports
import Head from 'next/head'
import Image from 'next/image'

//Components
import Hero from '../components/Hero'
import Sektion from '../components/Sektion'

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
              id
              url
              width
              height
            }
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
            overskrift
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
      { blokke.map((blok, i) => (
          blok.__typename === 'Sektion' ?
          <Sektion arr={blok} /> :
          blok.__typename === 'USP' ?
          <></> :
          <></>
        )) }
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
