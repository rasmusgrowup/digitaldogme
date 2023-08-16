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
import {getCaseBySlug, getAllCasesWithSlug, getMenu} from "../../lib/hygraph";
import {useRouter} from "next/router";
import Layout from "../../components/Layout";
import Head from "next/head";

export default function Case({data, menu}) {
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    let theme = 'sky';

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
                        <div className={styles.info}>
                        <span className={styles.tilbage} onClick={router.back}>
                            Tilbage til oversigten
                        </span>
                            <Moment locale='da' format='ll'>
                                {data.case.dato.toString()}
                            </Moment>
                        </div>
                        <div className={styles.richInner}>
                            <h2 className={styles.h2}>
                                {data.case.resume}
                            </h2>
                            <div
                                className={styles.rich}
                                dangerouslySetInnerHTML={{__html: `${data.case.indhold.html}`}}
                            >
                            </div>
                            {data.case.faktabox &&
                                <div className={styles.factWrapper}>
                                    <h3>{data.case.faktabox.titel}</h3>
                                    {loaded &&
                                        <div dangerouslySetInnerHTML={{__html: `${data.case.faktabox.tekst.html}`}}/>}
                                </div>
                            }
                        </div>
                    </section>
                </Layout>
            }
        </>
    )
}

export async function getStaticProps({params, preview = false}) {
    const data = await getCaseBySlug(params.slug, preview)
    const menu = await getMenu("dev")

    return {
        props: {
            preview,
            data,
            menu
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