// Default imports
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'

// SCSS Styling
import styles from '../styles/partners.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Partners({arr, index, shouldHaveLine}) {
    const router = useRouter()

    return (
        <>
            <section className={styles.section}>
                <header className={styles.header}>
                    <h2 className={styles.h2}>{arr.overskrift}</h2>
                    <div className={styles.column}>
                        {arr.tekstPartner && <div className={styles.p} dangerouslySetInnerHTML={{__html: `${arr.tekstPartner.html}`}}/>}
                        {arr.callToAction &&
                            <Link href={arr.callToAction.link}>
                                <a className={styles.link}>{arr.callToAction.label}</a>
                            </Link>
                        }
                    </div>
                </header>
                <div className={styles.grid}>
                    {arr.partnere.map((partner, i) => (
                        <div
                            className={styles.partner}
                            key={i}>
                            <Link href={partner.website} passHref>
                                <a target='_blank'>
                                    <Image
                                        src={partner.billede.url}
                                        alt={partner.billede.alt}
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
