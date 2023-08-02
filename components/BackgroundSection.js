import styles from '../styles/backgroundSection.module.scss'
import Link from "next/link";
import FeatherIcon from "feather-icons-react";

export default function BackgroundSection({section}) {
    return (
        <section className={styles.section} style={{backgroundImage: `url(${section.backgroundImage.url})`}}>
            <div className={styles.inner}>
                <h2 className={styles.h2}>{section.titel}</h2>
                <p className={styles.p}>{section.text}</p>
                <Link href={section.link.adresse}>
                    <a className={styles.a}>
                        {section.link.titel}
                        <FeatherIcon icon={section.link.ikon} size={21} strokeWidth={1}/>
                    </a>
                </Link>
            </div>
        </section>
    )
}