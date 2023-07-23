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

export default function Case({data, menu}) {
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!router.isFallback && !data.case?.slug) {
        return <ErrorPage statusCode={404}/>
    }

    return (
        <>
            {data && <Layout menu={menu} hasHero='true' key={data.id}>
                <Hero
                    height={true}
                    url={data.case.billede.url}
                    overskrift={data.case.titel}
                    tekst={data.case.resume}
                    alt={data.case.billede.alt}
                />
                <section className={styles.richWrapper}>
                    <div className={styles.richInner}>
          <span className={styles.tilbage}>
            <Link href='/cases'>
              <a>
                <FeatherIcon
                    className={styles.ikon}
                    icon='chevron-left'
                    size={10} style={{color: 'red'}}/>
                Tilbage til oversigten
              </a>
            </Link>
          </span>
                        <div className={styles.info}>
            <span>
              <Moment locale='da' format='ll'>
                {data.case.dato.toString()}
              </Moment>
            </span>
                            <span>{data.case.kategori}</span>
                            <span>{data.case.titel}</span>
                        </div>
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
            </Layout>}
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