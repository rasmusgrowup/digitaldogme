import Layout from "../components/Layout";
import {getMenu} from "../lib/hygraph";
import styles from "../styles/main.module.scss";
import { useRouter } from 'next/router'
import Link from "next/link";

export async function getStaticProps({params}) {
    const menu = await getMenu("dev")

    return {
        props: {
            menu
        },
    }
}


export default function Custom404({menu}) {
    const router = useRouter()

    return (
        <Layout preview={'undefined'} menu={menu} key={'404'} theme={'dark'}>
            <div className={styles.titel}>
                <h1 className={styles.h1}>404. Noget gik galt</h1>
                <div className={styles.date}>Opdateret: {new Date().toLocaleDateString()}</div>
            </div>
            <div className={styles.div}>
                <div onClick={() => router.back()} style={{ cursor: 'pointer' }}>Gå tilbage til <u>forrige side</u></div>
                <div>Eller kontakt os på <Link href={'mailto:mette@digitaldogme.dk'}><u style={{ cursor: 'pointer' }}>mette@digitaldogme.dk</u></Link>, hvis du mener der er tale om en fejl.</div>
            </div>
        </Layout>
    )
}