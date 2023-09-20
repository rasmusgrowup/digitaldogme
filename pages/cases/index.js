//Components
import Hero from '../../components/Hero'
import styles from '../../styles/publikationer.module.scss'

//GraphCMS
import {getAllCases, getMenu, getPage, getPageTopSection} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import Publikationer from "../../components/Publikationer";
import Blocks from "../../components/Blocks";

export default function Cases({cases, hero, side, menu}) {
    let theme = side.colorTheme.toLowerCase()

    return (
        <Layout menu={menu} hasHero='true' key={hero.id} theme={theme}>
            <Head>
                <meta name="description" content={hero.topSektion.tekst} key='description'/>
                <meta name="og:title" content={hero.topSektion.overskrift} key='title'/>
                <meta property="og:image" content={hero.topSektion.billede.url}/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <title>Digital Dogme | {hero.topSektion.overskrift}</title>
            </Head>
            <Hero
                height={hero.topSektion.height}
                url={hero.topSektion.billede.url}
                overskrift={hero.topSektion.overskrift}
                tekst={hero.topSektion.tekst}
                alt={hero.topSektion.billede.alt}
                theme={theme}
            />
            <Publikationer arr={cases} types="null"/>
            {/* <section className={styles.indexOverview}>
                { cases.map((item, i) => (
                    <div key={item.id} className={styles.indexItem}>
                        <div className={styles.indexDate}>{item.dato}</div>
                        <div className={styles.indexTitel}>{item.titel}</div>
                        <Link href={`cases/${item.slug}`}><a className={styles.indexLink}>Gå til cases</a></Link>
                    </div>
                ))}
            </section> */}
            {side.blokke && <Blocks blokke={side.blokke}/>}
        </Layout>
    )
}

export async function getStaticProps() {
    const cases = (await getAllCases()) || []
    const hero = await getPageTopSection("cases")
    const menu = await getMenu("dev")
    const side = await getPage("cases");

    return {
        props: {
            cases,
            hero,
            menu,
            side
        },
    }
}