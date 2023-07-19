//Components
import Hero from '../components/Hero'
import Blocks from '../components/Blocks'

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

    return (
        <Layout preview={'undefined'} menu={menu}>
            {side.topSektion && <Hero
                height={side.topSektion.height}
                url={side.topSektion.billede.url}
                overskrift={side.topSektion.overskrift}
                tekst={side.topSektion.tekst}
                alt={side.topSektion.billede.alt}
            />}
            <Blocks blokke={side.blokke}/>
        </Layout>
    )
}
