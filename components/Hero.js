// Default imports
import Image from "next/image"
import Link from "next/link"
import {motion} from "framer-motion";

// SCSS Styling
import styles from '../styles/hero.module.scss'
import FeatherIcon from "feather-icons-react";

export default function Hero({height, tekst, url, overskrift, alt, theme, cta, pdf, layout}) {

    return (
        <>
            <section className={`
                ${theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.dark}`}
                ${styles.hero}
                ${layout === 'childPage' || !height ? `${styles.halfHero}` : `${styles.fullHeight}`}
                `}>
                <div className={styles.content}>
                    <div className={styles.wrapper}>
                        <motion.h1 initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ delay: 0.75 }} className={styles.h1}>
                            {overskrift}
                        </motion.h1>
                        <motion.div className={styles.column} initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ delay: 0.9 }}>
                            <p className={styles.p}>{tekst}</p>
                            { cta && cta ?
                                <div className={styles.cta}>
                                    <Link href={cta.adresse} passHref><a>{cta.titel}<FeatherIcon icon={'arrow-up-right'} size={16} strokeWidth={'1.5'}/></a></Link>
                                </div>
                              : pdf &&
                                <div className={styles.cta}>
                                    <Link href={pdf.url} passHref><a target={"_blank"}>Åben {`'${pdf.fileName}'`} <FeatherIcon icon={'arrow-up-right'} size={16} strokeWidth={'1.5'}/></a></Link>
                                </div>
                            }
                        </motion.div>
                    </div>
                </div>
                <motion.div className={styles.image} initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1}} transition={{ delay: 1 }}>
                    {layout === 'childPage' || !height ?
                        <Image
                            src={url}
                            height={'700'}
                            width={'700'}
                            objectFit={'cover'}
                            layout={'responsive'}
                            quality='100'
                            priority='true'
                            alt={alt}
                        /> :
                        <Image
                            src={url}
                            layout='fill'
                            objectFit='cover'
                            objectPosition='center'
                            quality='100'
                            priority='true'
                            alt={alt}
                        />
                    }
                </motion.div>
            </section>
        </>
    )
}
