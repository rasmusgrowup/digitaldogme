// Default imports
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'

// SCSS Styling
import styles from '../styles/partners.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Partners({arr, index}) {
    const router = useRouter()

    return (
        <>
            <section className={styles.section}>
                <header className={styles.header}
                        style={index === 0 ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    <h2 className={styles.h2}>{arr.overskrift}</h2>
                    <div className={styles.p} dangerouslySetInnerHTML={{__html: `${arr.tekstPartner.html}`}}/>
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
                                        height={partner.billede.height}
                                        width={partner.billede.width}
                                        alt={partner.billede.alt}
                                    />
                                </a>
                            </Link>
                        </div>
                    ))}
                </div>
                {arr.callToAction &&
                    <div className={styles.cta} onClick={() => router.push(`${arr.callToAction.link}`)}>
                      <span className={styles.icon}>
                        <FeatherIcon
                            icon={arr.callToAction.ikon}
                            size={15}
                            style={{color: 'var(--bg)'}}
                        />
                      </span>
                        <span>{arr.callToAction.label}</span>
                    </div>
                }
            </section>
        </>
    )
}
