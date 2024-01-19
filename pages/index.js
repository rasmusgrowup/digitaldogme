//Components
import Blocks from '../components/Blocks'
import FullHero from "../components/FullHero";

//GraphCMS
import Layout from "../components/Layout";
import {getLatestCase, getMenu, getPage} from "../lib/hygraph";
import Meta from "../components/Meta";
import Head from "next/head";
import Hero from "../components/Hero";

export async function getStaticProps() {
    const side = await getPage("forside");
    const menu = await getMenu("dev");
    const latestCase = await getLatestCase();

    return {
        props: {
            side,
            menu,
            latestCase
        },
    }
}

export default function Home({side, menu, latestCase}) {
    let theme = side.colorTheme && side.colorTheme.toLowerCase() || 'dark';
    let caseStory = latestCase.cases[0];

    return (
        <Layout preview={'undefined'} menu={menu} hasHero='true' theme={theme}>
            <Head>
                <meta name="description" content={side.topSektion.tekst} key='description'/>
                <meta name="og:title" content={side.topSektion.overskrift} key='title'/>
                <meta property="og:image" content={side.topSektion.billede.url}/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
                <title>Digital Dogme | {side.topSektion.overskrift}</title>
            </Head>
            <Hero
                height={side.topSektion.billede.height}
                url={side.topSektion.billede.url}
                overskrift={side.topSektion.overskrift}
                tekst={side.topSektion.overskrift}
                alt={side.topSektion.billede.alt}
                theme={theme}
                cta={side.topSektion.link}
                layout={'childPage'}
            />
            <Blocks blokke={side.blokke}/>
        </Layout>
    )
}