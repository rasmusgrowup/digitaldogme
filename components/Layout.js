// SCSS Styles
import styles from '../styles/layout.module.scss'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Meta from '../components/Meta'

export default function Layout({ children, menu }) {
    return (
        <>
            <Meta/>
            <Header/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer menu={menu}/>
        </>
    )
}
