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
import {getEventBySlug, getLatestEvents, getMenu} from "../../lib/hygraph";
import Head from "next/head";
import Karussel from "../../components/Karussel";
import React, {useState} from "react";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({params}) {
    const {event} = await getEventBySlug(params.slug)
    const menu = await getMenu("dev")
    const latestEvents = (await getLatestEvents(params.slug)) || []

    return {
        props: {
            event,
            menu,
            latestEvents
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

export default function event({event, menu, latestEvents}) {
    let theme = 'curry'
    let items = latestEvents
    if (latestEvents) {
        items = items.map((item) => ({
            ...item,
            __typename: 'Event',
        }));
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [arr, setArr] = useState({items})
    console.log(event.personer)

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
                layout={'childPage'}
            />
            <section className={styles.richWrapper}>
                <div className={styles.richInner}>
                    <h2>
                        {event.resume}
                    </h2>
                    <div
                        className={styles.rich}
                        dangerouslySetInnerHTML={{__html: `${event.beskrivelse.html}`}}
                    >
                    </div>
                    {event.attachedMedia ? <h3>Links</h3> : <></>}
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
                </div>
                <div className={styles.rightColumn}>
                    <div className={`
                    ${styles.info}
                    ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                    `}>
                        {/* <p><strong>Tematikker</strong></p>
                    <p>Opkvalificering, digitalisering</p> */}
                        <p><strong>Tidspunkt</strong></p>
                        <p>
                            <Moment locale='da' format='ll'>{event.dato.toString()}</Moment>
                            {', '}{event.tidspunktSlut ? <>{event.tidspunktStart}-{event.tidspunktSlut}</> : <>{event.tidspunktStart}</>}
                        </p>
                        <p><strong>Lokation</strong></p>
                        <p>{event.lokation}</p>
                        {event.register &&
                            <Link href={{pathname: '/events/register', query: `id=${event.id}`}}>
                                <a>
                                    <div className={styles.registerBtn}>
                                        <span>Tilmeld dig eventet</span>
                                        <FeatherIcon icon={'arrow-up-right'} size={'17'} strokeWidth={'1'}/>
                                    </div>
                                </a>
                            </Link>
                        }
                        {event.faktabox && <p><strong>{event.faktabox.titel}</strong></p>}
                        {event.faktabox && <div className={styles.faktaboxTekst} dangerouslySetInnerHTML={{__html: `${event.faktabox.tekst.html}`}}/>}
                    </div>
                    {event.personer.length > 0 &&
                        <div className={styles.keynotes}>
                            <h3 className={styles.h3}>Dem kan du møde på scenen</h3>
                            <div className={styles.persons}>
                                {event.personer.map((person, i)=> (
                                    <div key={i}>
                                        <Image src={person.billedePerson.url} width={'300'} height={'300'} alt={person.navn} objectFit={'cover'} objectPosition={'top'}/>
                                        <div>{person.navn}</div>
                                        <div>{person.jobtitel}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </div>
            </section>
            <div className={styles.latest}>
                <h4>Andre events</h4>
                {latestEvents && <Karussel arr={arr}/>}
            </div>
            {event.sektioner.map((sektion, i) => (
                <Sektion arr={sektion} key={i}/>
            ))}
        </Layout>
    )
}
