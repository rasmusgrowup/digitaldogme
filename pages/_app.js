// Global Styling
import '../styles/globals.css'

// Components
import Layout from '../components/Layout'
import {MenuProvider} from "../lib/menuContext"
import {Analytics} from '@vercel/analytics/react';

function MyApp({Component, pageProps}) {
    return (
        <MenuProvider>
            <Layout>
                <Component {...pageProps} />
                <Analytics />
            </Layout>
        </MenuProvider>
    )
}

export default MyApp
