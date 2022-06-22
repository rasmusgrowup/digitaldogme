//Components
import Hero from '../components/HeroAnim'
import Blocks from '../components/Blocks'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

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
            height
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
            maxBredde
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
              link
            }
          }
          ... on Partner {
            id
            baggrundsfarve
            callToAction {
              id
              ikon
              label
              link
            }
            overskrift
            tekstPartner {
              html
            }
            partnere {
              virksomhed
              website
              id
              billede {
                height
                alt
                url
                width
              }
            }
          }
          ... on Team {
            id
            overskriftTeam
            tekstTeam {
              html
            }
            personer {
              billedePerson {
                height
                width
                url
              }
              id
              jobtitel
              mailadresse
              navn
              telefonnummer
              linkedIn
            }
          }
          ... on USP {
            id
            overskriftUSP
            tekstUSP {
              html
            }
            sellingPoint {
              id
              ikon
              titel
              tekst {
                html
              }
            }
            callToAction {
              id
              ikon
              label
              link
            }
          }
          ... on Karussel {
            id
            overskriftKarussel
            baggrundsfarve
            publikationer {
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
              link
            }
          }
          ... on Animeret {
            id
            baggrundsfarve
            overskriftAnimeret
            tekstAnimeret
            animeredeTal {
              __typename
              ... on Fraction {
                id
                beskrivelse
                naevner
                taeller
              }
              ... on Number {
                id
                betydning
                enhed
                tal
              }
            }
            cta {
              id
              ikon
              label
              link
            }
            baggrundsbillede {
              id
              url
              height
              width
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

export default function Home({ side }) {
  return (
    <>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
        alt={side.topSektion.billede.alt}
      />
      <Blocks blokke={side.blokke}/>
    </>
  )
}
