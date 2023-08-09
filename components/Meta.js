import Head from 'next/head'

function Meta({title, keywords, description}) {
    return (
        <Head>
            <link rel="icon" type="image/png" href="/favicon.ico"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta name="description" content={description} key='description'/>
            <meta name="keywords" content={keywords} key='keywords'/>
            <meta name="og:title" content={title} key='title'/>
            {/* <meta name="theme-color" content="#09091a"/> */}
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: 'Digital Dogme | Vi skaber kompetencer, synlighed og viden',
    keywords: 'Erhvervsliv, digital, opkvalificering, arbejdskraft, dansk, samfund, digital omstilling, digitale kompetencer, viden, synlighed, digital dogme',
    description: 'Digital Dogme er dansk erhvervslivs alliance for digital opkvalificering. Vi handler på den akutte mangel på kvalificeret arbejdskraft. Til gavn for den enkelte medarbejder, virksomhederne og det danske samfund.'
}

export default Meta
