//Components
import Hero from '../../components/Hero'
import Publikationer from '../../components/Publikationer'

//GraphCMS
import {getAllCases, getMenu, getPageTopSection} from "../../lib/hygraph";
import Layout from "../../components/Layout";

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
            <Publikationer arr={cases} types="null"/>
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