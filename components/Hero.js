// Default imports
import Image from "next/image"
import Link from "next/link"

// Framer motion
import {motion} from 'framer-motion';

// SCSS Styling
import styles from '../styles/hero.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

export default function Hero({height, url, overskrift, alt}) {
    return (
        <>
            <section className={`${styles.hero} ${height === true ? `${styles.fullHeight}` : ''}`}>
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
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.h1}>
                            {overskrift}
                        </h1>
                    </div>
                </div>
            </section>
        </>
    )
}
