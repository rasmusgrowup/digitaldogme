//Components
import Hero from '../components/Hero'
import Blocks from '../components/Blocks'

//Styles
import styles from '../styles/main.module.scss'

//HYGRAPH
import Layout from "../components/Layout";
import {getLandingPages, getMenu, getPage} from "../lib/hygraph";

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
    const heroExists = !!side.topSektion

    return (
        <Layout preview={'undefined'} menu={menu} hasHero={heroExists}>
            { side.topSektion && <Hero
                height={side.topSektion.height}
                url={side.topSektion.billede.url}
                overskrift={side.topSektion.overskrift}
                tekst={side.topSektion.tekst}
                alt={side.topSektion.billede.alt}
            /> }
            {!heroExists && <div className={styles.titel}><h1 className={styles.h1}>{side.titel}</h1></div>}
            {side.blokke && <Blocks blokke={side.blokke} withHero={!heroExists}/>}
        </Layout>
    )
}
