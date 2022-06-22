// Default imports
import Image from "next/image"
import Link from "next/link"
import Moment from 'react-moment'
import 'moment/locale/da';

//Components
import Hero from '../../components/Hero'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// SCSS Styling
import styles from '../../styles/publikationer.module.scss'

//GraphCMS
import { GraphQLClient, gql } from 'graphql-request';
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
        beskrivelse {
          html
        }
        type
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
        height={false}
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
              <Moment locale='da' format='lll'>
                {event.dato.toString()}
              </Moment>
            </span>
            <span>{event.type}</span>
            <span>{event.lokation}</span>
            <span>{event.titel}</span>
          </div>
          <h2>
            {event.resume}
          </h2>
          <div
            className={styles.rich}
            dangerouslySetInnerHTML={{ __html: `${event.beskrivelse.html}` }}
          >
          </div>
        </div>
      </section>
    </>
  )
}
