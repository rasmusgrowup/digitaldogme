// Default imports
import ErrorPage from 'next/error'
import Link from "next/link";
import Moment from 'react-moment';
import 'moment/locale/da';
import React, {useEffect, useState} from 'react';

//Components
import Hero from '../../components/Hero'

// Feather icons
import FeatherIcon from 'feather-icons-react';

// SCSS Styling
import styles from '../../styles/publikationer.module.scss'

//Hygraph
import {getCaseBySlug, getAllCasesWithSlug, getMenu, getLatestEvents, getLatestCases} from "../../lib/hygraph";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";
import Karussel from "../../components/Karussel";

export default function Case({data, menu, latestCases}) {
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    let theme = 'sky';
    let items = latestCases
    if (latestCases) {
        items = items.map((item) => ({
            ...item,
            __typename: 'Case',
        }));
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [arr, setArr] = useState({items})

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!router.isFallback && !data.case?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    return (
        <>
            {data &&
                <Layout menu={menu} hasHero='true' key={data.id} theme={theme}>
                    <Head>
                        <meta name="description" content={data.case.resume} key='description'/>
                        <meta name="og:title" content={data.case.titel} key='title'/>
                        <meta property="og:image" content={data.case.billede.url}/>
                        <meta name="viewport"
                              content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                        <title>Digital Dogme | {data.case.titel}</title>
                    </Head>
                    <Hero
                        height={true}
                        url={data.case.billede.url}
                        overskrift={data.case.titel}
                        tekst={data.case.resume}
                        alt={data.case.billede.alt}
                        theme={theme}
                    />
                    <section className={styles.richWrapper}>
                        <div className={styles.richInner}>
                            <h2 className={styles.h2}>
                                {data.case.resume}
                            </h2>
                            <div
                                className={styles.rich}
                                dangerouslySetInnerHTML={{__html: `${data.case.indhold.html}`}}
                            >
                            </div>
                        </div>
                        <div className={`
                            ${styles.info}
                            ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                            `}>
                            {/* <p><strong>Tematikker</strong></p>
                            <p>Opkvalificering, digitalisering</p> */}
                            <p><strong>Udgivelsesdato</strong></p>
                            <p><Moment locale='da' format='ll'>{data.case.dato.toString()}</Moment></p>
                            {data.case.originates.length > 0 && <p><strong>Udgivelsespapir</strong></p>}
                            {data.case.originates && data.case.originates.map((o, i) => (
                                <Link key={i} href={`/${o.slug}`}><a className={styles.link}>{o.titel}<FeatherIcon icon={'arrow-up-right'} strokeWidth={'1.5'} size={'14'}/></a></Link>
                            ))}
                            {data.case.faktabox &&
                                <div className={styles.factWrapper}>
                                    <p><strong>{data.case.faktabox.titel}</strong></p>
                                    {loaded &&
                                        <div dangerouslySetInnerHTML={{__html: `${data.case.faktabox.tekst.html}`}}/>}
                                </div>
                            }
                        </div>
                    </section>
                    <div className={styles.latest}>
                        <h4>Andre casehistorier</h4>
                        {latestCases && <Karussel arr={arr}/>}
                    </div>
                </Layout>
            }
        </>
    )
}

export async function getStaticProps({params}) {
    const data = await getCaseBySlug(params.slug)
    const menu = await getMenu("dev")
    const latestCases = (await getLatestCases(params.slug)) || []

    return {
        props: {
            data,
            menu,
            latestCases
        },
    }
}

export async function getStaticPaths() {
    const cases = await getAllCasesWithSlug()
    return {
        paths: cases.map(({slug}) => ({
            params: {slug},
        })),
        fallback: true,
    }
}