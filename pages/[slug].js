//Components
import Hero from '../components/Hero'
import Blocks from '../components/Blocks'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({ params }) {
  const { side } = await graphcms.request(`
    query forside($slug: String!) {
      side(where: {slug: $slug}) {
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
            baggrundsfarve
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
            items {
              ... on Case {
                __typename
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
              ... on Publikation {
                __typename
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
          }
        }
      }
    }
  `, {
    slug: params.slug
  });

  return {
    props: {
      side
    }
  }
}

export async function getStaticPaths() {
  const { sider } = await graphcms.request(`
    query sider {
      sider(where: {
        type: landingsside,
        AND: [
          {slug_not: "events"}
          {slug_not: "viden"}
          {slug_not: "cases"}
        ]
      }) {
        id
        slug
      }
    }
  `)

  return {
    paths: sider.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function Landingsside({ side }) {

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
