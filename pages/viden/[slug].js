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

// Framer motion
import {motion} from 'framer-motion';

//GraphCMS
import {GraphQLClient, gql} from 'graphql-request';
import {getCaseBySlug, getLatestCases, getLatestPublications, getMenu, getPublicationBySlug} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import Head from "next/head";
import Karussel from "../../components/Karussel";
import React, {useState} from "react";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({params}) {
    const {publikation} = await getPublicationBySlug(params.slug)
    const menu = await getMenu("dev")
    const latestPublications = (await getLatestPublications(params.slug)) || []

    return {
        props: {
            publikation,
            menu,
            latestPublications
        }
    }
}

export async function getStaticPaths() {
    const {publikationer} = await graphcms.request(`
    {
      publikationer {
        slug
      }
    }
  `);

    return {
        paths: publikationer.map(({slug}) => ({
            params: {slug},
        })),
        fallback: false,
    }
}

export default function Publikation({publikation, menu, latestPublications}) {
    const router = useRouter();
    let items = latestPublications
    if (latestPublications) {
        items = items.map((item) => ({
            ...item,
            __typename: 'Publikation',
        }));
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [arr, setArr] = useState({items})
    let theme = 'light'

    return (
        <Layout menu={menu} hasHero='true' key={publikation.id} theme={'light'}>
            <Head>
                <meta name="description" content={publikation.resume} key='description'/>
                <meta name="og:title" content={publikation.titel} key='title'/>
                <meta property="og:image" content={publikation.billede.url}/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <title>Digital Dogme | {publikation.titel}</title>
            </Head>
            <Hero
                height={true}
                url={publikation.billede.url}
                overskrift={publikation.titel}
                tekst={publikation.resume}
                alt={publikation.billede.alt}
                theme={theme}
                cta={publikation.pdf[0]}
            />
            <section className={styles.richWrapper}>
                <div className={styles.richInner}>
                    <h2>
                        {publikation.resume}
                    </h2>
                    <div className={styles.rich} dangerouslySetInnerHTML={{__html: `${publikation.indhold.html}`}}></div>
                    {publikation.pdf.map((pdf, i) => (
                        <Link href={pdf.url} passHref key={i}>
                            <a target='_blank'>
                                <div className={styles.pdfLink}>
                                    <span>{pdf.fileName}</span>
                                    <span>Åben <FeatherIcon icon={'arrow-up-right'} size={16}
                                                            strokeWidth={'1.5'}/> </span>
                                </div>
                            </a>
                        </Link>
                    ))}
                </div>
                <div className={`
                    ${styles.info}
                    ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                    `}>
                    <p><strong>Udgivelsesdato</strong></p>
                    <p><Moment locale='da' format='ll'>{publikation.dato.toString()}</Moment></p>
                    {publikation.cases.length > 0 && <p><strong>Tilhørende cases</strong></p>}
                    {publikation.cases.map((o, i) => (
                        <Link key={i} href={`/${o.slug}`}><a className={styles.link}>{o.titel}<FeatherIcon icon={'arrow-up-right'} strokeWidth={'1.5'} size={'14'}/></a></Link>
                    ))}
                </div>
            </section>
            <div className={styles.latest}>
                <h4>Andre udgivelser</h4>
                {latestPublications && <Karussel arr={arr}/>}
            </div>
        </Layout>
    )
}
