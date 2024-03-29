// Global Styling
import '../styles/globals.css'

// Components
import {MenuProvider} from "../lib/menuContext"
import {Analytics} from '@vercel/analytics/react';

function MyApp({Component, pageProps}) {
    return (
        <MenuProvider>
            <Component {...pageProps} />
            <Analytics />
        </MenuProvider>
    )
}

export default MyApp
