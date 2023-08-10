//Components
import Hero from '../../components/Hero'
import Udgivelser from '../../components/Udgivelser'

//GraphCMS
import {getAllCases, getAllPublications, getAllPublicationTypes, getMenu, getPageTopSection} from "../../lib/hygraph";
import Layout from "../../components/Layout";
import {useState} from "react";

export default function Cases({cases, hero, publikationer, types, menu}) {
    const updatedCases = cases.map(item => ({
        ...item,
        kategori: 'Case'
    }));
    const [arr, setArr] = useState([...updatedCases, ...publikationer])
    const [sortedArray, setSortedArray] = useState(arr.sort((a,b) => a.dato < b.dato ? 1 : -1))
    return (
        <Layout menu={menu} hasHero='true' key={hero.id} theme='green'>
            <Hero
                height={hero.topSektion.height}
                url={hero.topSektion.billede.url}
                overskrift={hero.topSektion.overskrift}
                tekst={hero.topSektion.tekst}
                alt={hero.topSektion.billede.alt}
                theme='green'
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

    return {
        props: {
            cases,
            hero,
            publikationer,
            types,
            menu
        },
    }
}