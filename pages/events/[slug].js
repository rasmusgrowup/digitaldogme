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
import {GraphQLClient, gql} from 'graphql-request';
import {motion} from "framer-motion";
import Layout from "../../components/Layout";
import {getMenu} from "../../lib/hygraph";
import Head from "next/head";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({params}) {
    const {event} = await graphcms.request(`
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
    const {events} = await graphcms.request(`
    {
      events {
        slug
      }
    }
  `);

    return {
        paths: events.map(({slug}) => ({
            params: {slug},
        })),
        fallback: false,
    }
}

export default function event({event, menu}) {
    let theme = 'curry'

    return (
        <Layout menu={menu} hasHero='true' key={event.id} theme={theme}>
            <Head>
                <meta name="description" content={event.resume} key='description'/>
                <meta name="og:title" content={event.titel} key='title'/>
                <meta property="og:image" content={event.billede.url}/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <title>Digital Dogme | {event.titel}</title>
            </Head>
            <Hero
                height={true}
                url={event.billede.url}
                overskrift={event.titel}
                tekst={event.resume}
                alt={event.billede.alt}
                theme={theme}
            />
            <section className={styles.richWrapper}>
                <div className={styles.richInner}>
                    <div className={styles.info}>
                        {/*<div className={styles.tilbage}>
              <Link href='/events'>
                <a>
                  <FeatherIcon
                      className={styles.ikon}
                      icon='chevron-left'
                      size={10} style={{ color: 'red' }} />
                  Tilbage til events
                </a>
              </Link>
            </div> */}
                        <div>
                            <Moment locale='da' format='ll'>
                                {event.dato.toString()}
                            </Moment>
                            {', '}{event.tidspunktSlut
                            ? <>{event.tidspunktStart}-{event.tidspunktSlut}</>
                            : <>{event.tidspunktStart}</>
                        }
                        </div>
                        <span>{event.lokation}</span>
                    </div>
                    <h2>
                        {event.resume}
                    </h2>
                    <div
                        className={styles.rich}
                        dangerouslySetInnerHTML={{__html: `${event.beskrivelse.html}`}}
                    >
                    </div>
                    {event.attachedMedia &&
                        <Link href={event.attachedMedia.url} passHref>
                            <a target='_blank'>
                                <motion.div
                                    whileHover={{scale: 1.02}}
                                    whileTap={{scale: 0.98}}
                                    className={styles.pdfLink}>
                                    <span>{event.attachedMedia.fileName}</span>
                                    <span>Læs</span>
                                </motion.div>
                            </a>
                        </Link>
                    }
                </div>
            </section>
            {event.sektioner.map((sektion, i) => (
                <Sektion arr={sektion} key={i}/>
            ))}
        </Layout>
    )
}
