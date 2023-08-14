//Components
import Hero from '../../components/Hero'
import Events from '../../components/Events'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
import Layout from "../../components/Layout";
import {getMenu} from "../../lib/hygraph";
import Head from "next/head";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
  const { side, events, __type } = await graphcms.request(`
    query viden {
      side(where: {slug: "events"}, stage: DRAFT) {
        id
        slug
        titel
        type
        colorTheme
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
  let theme = side.colorTheme && side.colorTheme.toLowerCase() || 'dark';

  return (
    <Layout menu={menu} hasHero='true' key={side.id} theme={theme}>
      <Head>
        <meta name="description" content={side.topSektion.tekst} key='description'/>
        <meta name="og:title" content={side.topSektion.overskrift} key='title'/>
        <meta property="og:image" content={side.topSektion.billede.url}/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
        <title>Digital Dogme | {side.topSektion.overskrift}</title>
      </Head>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
        alt={side.topSektion.billede.alt}
        theme={theme}
      />
      <Events arr={events} types={__type}/>
    </Layout>
  )
}
