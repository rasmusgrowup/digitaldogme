// Default imports
import Image from "next/image"
import {motion} from "framer-motion";

// SCSS Styling
import styles from '../styles/hero.module.scss'

export default function FullHero({height, tekst, url, overskrift, alt}) {

    return (
        <>
            <section className={styles.fullHero}>
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <motion.h1 className={styles.h1} initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ delay: 0.5 }}>
                            {overskrift}
                        </motion.h1>
                        <motion.div className={styles.column} initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ delay: 0.66 }}>
                            <p className={styles.p}>{tekst}</p>
                        </motion.div>
                    </div>
                </div>
                <motion.div className={styles.image} initial={{opacity: 0}} animate={{opacity: 1}} transition={{ delay: 0.25 }}>
                    <Image
                        src={url}
                        layout='fill'
                        objectFit='cover'
                        objectPosition='center'
                        quality='100'
                        priority='true'
                        alt={alt}
                    />
                </motion.div>
            </section>
        </>
    )
}
