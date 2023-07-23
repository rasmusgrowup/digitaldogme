// Default imports
import Image from "next/image"
import Link from "next/link"
import Moment from 'react-moment'
import 'moment/locale/da';

//Components
import Hero from '../../components/Hero'
import Sektion from '../../components/Sektion'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// SCSS Styling
import styles from '../../styles/publikationer.module.scss'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
import {motion} from "framer-motion";
import Layout from "../../components/Layout";
import {getMenu} from "../../lib/hygraph";
const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({ params }) {
  const { event } = await graphcms.request(`
    query event($slug: String!) {
      event(where: {slug: $slug}) {
        id
        slug
        titel
        resume
        lokation
        billede {
          alt
          url
        }
        dato
        tidspunktStart
        tidspunktSlut
        beskrivelse {
          html
        }
        type
        attachedMedia {
          url
          fileName
        }
        sektioner {
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
      }
    }
  `, {
    slug: params.slug
  });
  const menu = await getMenu("dev")

  return {
    props: {
      event,
      menu
    }
  }
}

export async function getStaticPaths() {
  const { events } = await graphcms.request(`
    {
      events {
        slug
      }
    }
  `);

  return {
    paths: events.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export default function event({ event, menu }) {

  return (
    <Layout menu={menu} hasHero='true' key={event.id}>
      <Hero
        height={true}
        url={event.billede.url}
        overskrift={event.titel}
        tekst={event.resume}
        alt={event.billede.alt}
      />
      <section className={styles.richWrapper}>
        <div className={styles.richInner}>
          <span className={styles.tilbage}>
            <Link href='/events'>
              <a>
                <FeatherIcon
                  className={styles.ikon}
                  icon='chevron-left'
                  size={10} style={{ color: 'red' }} />
                Tilbage til events
              </a>
            </Link>
          </span>
          <div className={styles.info}>
            <span>
              <Moment locale='da' format='ll'>
                {event.dato.toString()}
              </Moment>
            </span>
            <span>
            {event.tidspunktSlut
              ? <>{event.tidspunktStart}-{event.tidspunktSlut}</>
              : <>{event.tidspunktStart}</>
            }
            </span>
            <span>{event.lokation}</span>
          </div>
          <h2>
            {event.resume}
          </h2>
          <div
            className={styles.rich}
            dangerouslySetInnerHTML={{ __html: `${event.beskrivelse.html}` }}
          >
          </div>
          { event.attachedMedia &&
              <Link href={event.attachedMedia.url} passHref>
                <a target='_blank'>
                  <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98}}
                      className={styles.pdfLink}>
                    <span>{event.attachedMedia.fileName}</span>
                    <span>Læs</span>
                  </motion.div>
                </a>
              </Link>
          }
        </div>
      </section>
      { event.sektioner.map((sektion, i) => (
          <Sektion arr={sektion} key={i} />
      ))}
    </Layout>
  )
}
