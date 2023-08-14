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
import {getMenu} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import {useRouter} from "next/router";
import Head from "next/head";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps({params}) {
    const {publikation} = await graphcms.request(`
    query publikation($slug: String!) {
      publikation(
        where: {slug: $slug}
        ) {
        id
        slug
        titel
        resume
        billede {
          alt
          url
        }
        dato
        indhold {
          html
        }
        kategori
        pdf {
          url
          fileName
        }
      }
    }
  `, {
        slug: params.slug
    });
    const menu = await getMenu("dev")

    return {
        props: {
            publikation,
            menu
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

export default function Publikation({publikation, menu}) {
    const router = useRouter();

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
                theme={'light'}
                cta={publikation.pdf[0]}
            />
            <section className={styles.richWrapper}>
                <div className={styles.info}>
                    <span className={styles.tilbage} onClick={router.back}>
                        Tilbage til oversigten
                    </span>
                    <Moment locale='da' format='ll'>
                        {publikation.dato.toString()}
                    </Moment>
                </div>
                <div className={styles.richInner}>
                    <h2>
                        {publikation.resume}
                    </h2>
                    <div
                        className={styles.rich}
                        dangerouslySetInnerHTML={{__html: `${publikation.indhold.html}`}}
                    >
                    </div>
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
            </section>
        </Layout>
    )
}
