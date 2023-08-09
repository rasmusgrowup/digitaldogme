//Components
import Blocks from '../components/Blocks'
import FullHero from "../components/FullHero";

//GraphCMS
import Layout from "../components/Layout";
import {getMenu, getPage} from "../lib/hygraph";

export async function getStaticProps() {
    const side = await getPage("forside-test")
    const menu = await getMenu("dev")

    return {
        props: {
            side,
            menu
        },
    }
}

export default function Home({side, menu}) {

    return (
        <Layout preview={'undefined'} menu={menu} hasHero='true' navTheme='light'>
            <FullHero
                height={side.topSektion.height}
                url={side.topSektion.billede.url}
                overskrift={side.topSektion.overskrift}
                tekst={side.topSektion.tekst}
                alt={side.topSektion.billede.alt}
            />
            <Blocks blokke={side.blokke}/>
        </Layout>
    )
}
