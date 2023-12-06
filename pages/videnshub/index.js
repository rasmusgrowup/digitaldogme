//Components
import Hero from '../../components/Hero'
import Udgivelser from '../../components/Udgivelser'

//GraphCMS
import {
    getAllCases,
    getAllPublications,
    getAllPublicationTypes,
    getMenu,
    getPage,
    getPageTopSection
} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import {useState} from "react";
import Head from "next/head";
import Blocks from "../../components/Blocks";

export default function Cases({cases, hero, publikationer, types, menu, side}) {
    const updatedCases = cases.map(item => ({
        ...item,
        kategori: 'Case'
    }));
    const [arr, setArr] = useState([...updatedCases, ...publikationer])
    const [sortedArray, setSortedArray] = useState(arr.sort((a,b) => a.dato < b.dato ? 1 : -1))
    let theme = side.colorTheme.toLowerCase()

    return (
        <Layout menu={menu} hasHero='true' key={hero.id} theme={theme}>
            <Head>
                <meta name="description" content={side.topSektion.tekst} key='description'/>
                <meta name="og:title" content={side.topSektion.overskrift} key='title'/>
                <meta property="og:image" content={side.topSektion.billede.url}/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <title>Digital Dogme | {side.topSektion.overskrift}</title>
            </Head>
            <Hero
                height={hero.topSektion.height}
                url={hero.topSektion.billede.url}
                overskrift={hero.topSektion.overskrift}
                tekst={hero.topSektion.tekst}
                alt={hero.topSektion.billede.alt}
                theme={theme}
            />
            <Udgivelser arr={sortedArray} types={types} shouldHaveLine={side.blokke}/>
            {side.blokke && <Blocks blokke={side.blokke}/>}
        </Layout>
    )
}

export async function getStaticProps() {
    const cases = (await getAllCases()) || []
    const publikationer = (await getAllPublications()) || []
    const types = (await getAllPublicationTypes()) || []
    const hero = await getPageTopSection("videnshub")
    const menu = await getMenu("dev")
    const side = await getPage("videnshub");

    return {
        props: {
            cases,
            hero,
            publikationer,
            types,
            menu,
            side
        },
    }
}