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
              link
              link
            }
          }
          ... on Animeret {
            id
            baggrundsfarve
            overskriftAnimeret
            tekstAnimeret
            tal {
              betydning
              enhed
              id
              tal
            }
            cta {
              id
              ikon
              label
              link
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
      sider(where: {type: landingsside}) {
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
  console.log({ side })
  return (
    <>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
      />
      <Blocks blokke={side.blokke}/>
    </>
  )
}
