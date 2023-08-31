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
        register
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

  return {
    props: {
      event
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

export default function event({ event }) {

  return (
    <>
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
            {event.titel}
          </h2>
          <div
            className={styles.rich}
            dangerouslySetInnerHTML={{ __html: `${event.beskrivelse.html}` }}
          >
          </div>
            <div>
              {event.attachedMedia || event.register ? <h3>Links</h3> : <></>}
              {event.attachedMedia &&
                  <Link href={event.attachedMedia.url} passHref>
                    <a target='_blank'>
                      <div className={styles.pdfLink}>
                        <span>{event.attachedMedia.fileName}</span>
                        <FeatherIcon icon={'arrow-up-right'} strokeWidth={'1'}/>
                      </div>
                    </a>
                  </Link>
              }
              {event.register &&
                <Link href={{pathname: '/events/register', query: `id=${event.id}`}}>
                  <a>
                    <div className={styles.registerBtn}>
                      <span>Tilmeld dig eventet</span>
                      <FeatherIcon icon={'arrow-up-right'} strokeWidth={'1'}/>
                    </div>
                  </a>
                </Link>
              }
            </div>
        </div>
      </section>
      { event.sektioner.map((sektion, i) => (
          <Sektion arr={sektion} key={i} />
      ))}
    </>
  )
}
