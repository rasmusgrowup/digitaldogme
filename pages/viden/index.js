//Components
import Hero from '../../components/Hero'
import Publikationer from '../../components/Publikationer'

//GraphCMS
import {GraphQLClient, gql} from 'graphql-request';
import {getMenu} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import styles from "../../styles/publikationer.module.scss";
import Link from "next/link";
import Head from "next/head";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
    const {side, publikationer, __type} = await graphcms.request(`
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

export default function Viden({side, publikationer, __type, menu}) {

    return (
        <Layout menu={menu} hasHero='true' key={side.id}>
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
            />
            {/* <Publikationer arr={publikationer} types={__type}/> */}
            <section className={styles.indexOverview}>
                {publikationer.map((item, i) => (
                    <div key={item.id} className={styles.indexItem}>
                        <div className={styles.indexDate}>{item.dato}</div>
                        <div className={styles.indexTitel}>{item.titel}</div>
                        <Link href={`cases/${item.slug}`}><a className={styles.indexLink}>Gå til
                            publikationen</a></Link>
                    </div>
                ))}
            </section>
        </Layout>
    )
}
