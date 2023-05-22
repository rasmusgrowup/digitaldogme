//Components
import Hero from '../../components/Hero'
import Publikationer from '../../components/Publikationer'

//GraphCMS
import {getAllCases, getPageTopSection} from "../../lib/hygraph";
import Layout from "../../components/Layout";

export default function Cases({cases, page, preview}) {
    return (
        <Layout preview={preview}>
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

export async function getStaticProps({preview = false}) {
    const cases = (await getAllCases(preview)) || []
    const page = await getPageTopSection("cases", preview)
    return {
        props: {
            preview,
            cases,
            page
        },
    }
}