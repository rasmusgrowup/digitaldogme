// SCSS Styles
import styles from '../styles/layout.module.scss'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Meta from '../components/Meta'
import Link from "next/link";

export default function Layout({children, preview}) {
    console.log(preview)
    return (
        <>
            <Meta/>
            <Header/>
            <main className={styles.main}>
                {children}
                { !preview ? (
                    <div className={styles.endPreviewBtn}>
                        <Link href='/api/preview-all?secret=aLittleSecret' prefetch={false}>
                            <a>Start preview</a>
                        </Link>
                    </div>
                ) :
                    <div className={styles.endPreviewBtn}>
                        <Link href='/api/end-preview' prefetch={false}>
                            <a>End preview</a>
                        </Link>
                    </div>
                }
            </main>
            <Footer/>
        </>
    )
}
