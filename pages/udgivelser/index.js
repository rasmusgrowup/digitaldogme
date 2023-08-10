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
            <Hero
                height={hero.topSektion.height}
                url={hero.topSektion.billede.url}
                overskrift={hero.topSektion.overskrift}
                tekst={hero.topSektion.tekst}
                alt={hero.topSektion.billede.alt}
                theme={theme}
            />
            <Udgivelser arr={sortedArray} types={types}/>
        </Layout>
    )
}

export async function getStaticProps() {
    const cases = (await getAllCases()) || []
    const publikationer = (await getAllPublications()) || []
    const types = (await getAllPublicationTypes()) || []
    const hero = await getPageTopSection("udgivelser")
    const menu = await getMenu("dev")
    const side = await getPage("udgivelser");

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