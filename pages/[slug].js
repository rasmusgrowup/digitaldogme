//Components
import Hero from '../components/Hero'
import Blocks from '../components/Blocks'

//HYGRAPH
import Layout from "../components/Layout";
import {getLandingPages, getPage} from "../lib/hygraph";

export async function getStaticProps({params}) {
    const side = await getPage(params.slug)

    return {
        props: {
            side
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

export default function Landingsside({side}) {
    console.log(side)
    return (
        <Layout preview={'undefined'}>
            <Hero
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
