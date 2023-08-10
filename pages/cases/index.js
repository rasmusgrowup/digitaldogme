//Components
import Hero from '../../components/Hero'
import styles from '../../styles/publikationer.module.scss'

//GraphCMS
import {getAllCases, getMenu, getPageTopSection} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import Link from "next/link";

export default function Cases({cases, page, menu}) {
    return (
        <Layout menu={menu} hasHero='true' key={page.id}>
            <Hero
                height={page.topSektion.height}
                url={page.topSektion.billede.url}
                overskrift={page.topSektion.overskrift}
                tekst={page.topSektion.tekst}
                alt={page.topSektion.billede.alt}
            />
            {/* <Publikationer arr={cases} types="null"/> */}
            <section className={styles.indexOverview}>
                { cases.map((item, i) => (
                    <div key={item.id} className={styles.indexItem}>
                        <div className={styles.indexDate}>{item.dato}</div>
                        <div className={styles.indexTitel}>{item.titel}</div>
                        <Link href={`cases/${item.slug}`}><a className={styles.indexLink}>Gå til cases</a></Link>
                    </div>
                ))}
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const cases = (await getAllCases()) || []
    const page = await getPageTopSection("cases")
    const menu = await getMenu("dev")

    return {
        props: {
            cases,
            page,
            menu
        },
    }
}