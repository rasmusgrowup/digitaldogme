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
    const side = await getPage("forside-test");
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
    console.log(latestCase)
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
                height={caseStory.billede.height}
                url={caseStory.billede.url}
                overskrift={caseStory.titel}
                tekst={caseStory.resume}
                alt={side.topSektion.billede.alt}
                theme={theme}
                cta={caseStory}
                layout={'childPage'}
            />
            <section style={{ padding: '5rem 1.8rem 0' }}>
                <h1 style={{ fontSize: '4.5rem', margin: '0', maxWidth: '1000px', lineHeight: '1' }}>I Digital Dogme står vi sammen om at øge digital kompetence i dansk erhvervsliv</h1>
            </section>
            <Blocks blokke={side.blokke}/>
        </Layout>
    )
}