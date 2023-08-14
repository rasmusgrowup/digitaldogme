//Components
import Hero from '../components/Hero'
import Blocks from '../components/Blocks'

//Styles
import styles from '../styles/main.module.scss'

//HYGRAPH
import Layout from "../components/Layout";
import {getLandingPages, getMenu, getPage} from "../lib/hygraph";
import Moment from "react-moment";
import Head from "next/head";

export async function getStaticProps({params}) {
    const side = await getPage(params.slug)
    const menu = await getMenu("dev")

    return {
        props: {
            side,
            menu
        },
    }
}

export async function getStaticPaths() {
    const sider = await getLandingPages();

    return {
        paths: sider.map(({slug}) => ({
            params: {slug},
        })),
        fallback: false,
    }
}

export default function Landingsside({side, menu}) {
    const heroExists = !!side.topSektion;
    let theme = side.colorTheme && side.colorTheme.toLowerCase() || 'dark';

    return (
        <Layout preview={'undefined'} menu={menu} hasHero={heroExists} key={side.id} theme={theme}>
            <Head>
                <meta name="description" content={side.topSektion && side.topSektion.tekst} key='description'/>
                <meta name="og:title" content={side.topSektion ? side.topSektion.overskrift : side.titel} key='title'/>
                <meta property="og:image" content={side.topSektion && side.topSektion.billede.url}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
                <title>Digital Dogme | {side.topSektion ? side.topSektion.overskrift : side.titel}</title>
            </Head>
            { side.topSektion ?
                <Hero
                    height={side.topSektion.height}
                    url={side.topSektion.billede.url}
                    overskrift={side.topSektion.overskrift}
                    tekst={side.topSektion.tekst}
                    alt={side.topSektion.billede.alt}
                    theme={theme}
                /> :
                <div className={styles.titel}>
                    <h1 className={styles.h1}>{side.titel}</h1>
                    <div className={styles.date}>Opdateret: <Moment date={side.updatedAt} locale='da' format='lll'/></div>
                </div>
            }
            {side.blokke && <Blocks blokke={side.blokke} withHero={!heroExists}/>}
        </Layout>
    )
}
