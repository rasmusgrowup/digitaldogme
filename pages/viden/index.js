//Components
import Hero from '../../components/Hero'
import Publikationer from '../../components/Publikationer'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
import {getMenu} from "../../lib/hygraph";
import Layout from "../../components/Layout";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
  const { side, publikationer, __type } = await graphcms.request(`
    query viden {
      side(where: {slug: "viden"}) {
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
      publikationer(
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
        kategori
        resume
        slug
        titel
      }
      __type(
        name: "Kategori"
      ) {
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
      publikationer,
      __type,
        menu
    }
  }
}

export default function Viden({ side, publikationer, __type, menu }) {

  return (
    <Layout menu={menu}>
      <Hero
        height={side.topSektion.height}
        url={side.topSektion.billede.url}
        overskrift={side.topSektion.overskrift}
        tekst={side.topSektion.tekst}
        alt={side.topSektion.billede.alt}
      />
      <Publikationer arr={publikationer} types={__type}/>
    </Layout>
  )
}
