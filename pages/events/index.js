//Components
import Hero from '../../components/Hero'
import Events from '../../components/Events'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
import Layout from "../../components/Layout";
import {getMenu} from "../../lib/hygraph";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
  const { side, events, __type } = await graphcms.request(`
    query viden {
      side(where: {slug: "events"}) {
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
      events(orderBy: dato_DESC) {
        id
        billede {
          id
          height
          url
          width
        }
        type
        dato
        tidspunktStart
        tidspunktSlut
        titel
        resume
        lokation
        beskrivelse {
          html
        }
        slug
      }
      __type(name: "Eventtype") {
        enumValues {
          name
        }
      }
    }
  `);
  const menu = await getMenu("dev")

  return {
    props: {
      side,
      events,
      __type,
      menu
    }
  }
}

export default function Viden({ side, events, __type, menu }) {
  return (
    <Layout menu={menu}>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
        alt={side.topSektion.billede.alt}
      />
      <Events arr={events} types={__type}/>
    </Layout>
  )
}
