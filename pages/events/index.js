//Components
import Hero from '../../components/Hero'
import Events from '../../components/Events'

//GraphCMS
import {GraphQLClient, gql} from 'graphql-request';
import Layout from "../../components/Layout";
import {getAllCases, getAllEvents, getAllEventTypes, getAllPublicationTypes, getMenu, getPage} from "../../lib/hygraph";
import Head from "next/head";
import Blocks from "../../components/Blocks";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT)

export async function getStaticProps() {
    const side = await getPage("events");
    const events = (await getAllEvents()) || []
    const __type = (await getAllEventTypes()) || []
    const menu = await getMenu("dev")

    return {
        props: {
            side,
            events,
            __type,
            menu
        }
    }
}

export default function Viden({side, events, __type, menu}) {
    let theme = side.colorTheme && side.colorTheme.toLowerCase() || 'dark';

    return (
        <Layout menu={menu} hasHero='true' key={side.id} theme={theme}>
            <Head>
                <meta name="description" content={side.topSektion.tekst} key='description'/>
                <meta name="og:title" content={side.topSektion.overskrift} key='title'/>
                <meta property="og:image" content={side.topSektion.billede.url}/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <title>Digital Dogme | {side.topSektion.overskrift}</title>
            </Head>
            <Hero
                height={side.topSektion.height}
                url={side.topSektion.billede.url}
                overskrift={side.topSektion.overskrift}
                tekst={side.topSektion.tekst}
                alt={side.topSektion.billede.alt}
                theme={theme}
            />
            <Events arr={events} types={__type} shouldHaveLine={side.blokke}/>
            {side.blokke && <Blocks blokke={side.blokke}/>}
        </Layout>
    )
}
