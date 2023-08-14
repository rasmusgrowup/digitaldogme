//Components
import Blocks from '../components/Blocks'
import FullHero from "../components/FullHero";

//GraphCMS
import Layout from "../components/Layout";
import {getMenu, getPage} from "../lib/hygraph";
import Meta from "../components/Meta";
import Head from "next/head";

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
    let theme = side.colorTheme && side.colorTheme.toLowerCase() || 'dark';


    return (
        <Layout preview={'undefined'} menu={menu} hasHero='true' theme={theme}>
            <Head>
                <meta name="description" content={side.topSektion.tekst} key='description'/>
                <meta name="og:title" content={side.topSektion.overskrift} key='title'/>
                <meta property="og:image" content={side.topSektion.billede.url}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
                <title>Digital Dogme | {side.topSektion.overskrift}</title>
            </Head>
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