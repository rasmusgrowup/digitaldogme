//Components
import Hero from '../../components/Hero'
import Publikationer from '../../components/Publikationer'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
const graphcms = new GraphQLClient(process.env.HYGRAPH_ENDPOINT)

export async function getStaticProps() {
  const { side, cases } = await graphcms.request(`
    query viden {
      side(where: {slug: "cases"}) {
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
      }
      cases(
        orderBy: dato_DESC
      ) {
        id
        billede {
          id
          height
          url
          width
        }
        dato
        resume
        slug
        titel
      }
    }
  `);

  return {
    props: {
      side,
      cases
    }
  }
}

export default function Cases({ side, cases }) {

  return (
    <>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
        alt={side.topSektion.billede.alt}
      />
      <Publikationer arr={cases} types="null"/>
    </>
  )
}
