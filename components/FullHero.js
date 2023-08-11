// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/hero.module.scss'

export default function FullHero({height, tekst, url, overskrift, alt}) {

    return (
        <>
            <section className={styles.fullHero}>
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>
                            {overskrift}
                        </h1>
                        <div className={styles.column}>
                            <p className={styles.p}>{tekst}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.image}>
                    <Image
                        src={url}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        quality='100'
                        priority='true'
                        alt={alt}
                    />
                </div>
            </section>
        </>
    )
}
