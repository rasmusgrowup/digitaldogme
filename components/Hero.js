// Default imports
import Image from "next/image"
import Link from "next/link"

// SCSS Styling
import styles from '../styles/hero.module.scss'
import FeatherIcon from "feather-icons-react";

export default function Hero({height, tekst, url, overskrift, alt, theme, cta}) {

    return (
        <>
            <section className={`
                ${theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                ${styles.hero} ${height === true ? `${styles.fullHeight}` : ''}
                `}>
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>
                            {overskrift}
                        </h1>
                        <div className={styles.column}>
                            <p className={styles.p}>{tekst}</p>
                            { cta &&
                                <div className={styles.cta}>
                                    <Link href={cta.url} passHref><a target={"_blank"}>Åben {`'${cta.fileName}'`} <FeatherIcon icon={'arrow-up-right'} size={16} strokeWidth={'1.5'}/></a></Link>
                                </div>
                            }
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
