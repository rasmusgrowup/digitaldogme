// Default imports
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'

// SCSS Styling
import styles from '../styles/sektion.module.scss'

export default function Sektion({arr, index}) {
    const router = useRouter()
    console.log(arr.topLine)
    return (
        <section className={styles.section}>
            <div className={`${styles.inner} ${arr.align === 'center' ? `${styles.centerAligned}` : arr.align === 'left' ? `${styles.leftAligned}` : `${styles.rightAligned}`}`}
                 style={index === 0 || !arr.topLine ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                <header className={styles.header}>
                    {arr.titel && <h2 className={styles.h2}>{arr.titel}</h2>}
                    <div className={styles.column}>
                        <div className={styles.p} dangerouslySetInnerHTML={{__html: `${arr.tekst.html}`}}/>
                        {arr.cta &&
                            <Link href={`${arr.cta.params ? `${arr.cta.link}${arr.cta.params}` : `${arr.cta.link}`}`}>
                                <a className={styles.link}>{arr.cta.label}</a>
                            </Link>
                        }
                    </div>
                </header>
                {arr.billede != null &&
                    <div className={`${styles.imageContainer} ${arr.align === 'center' ? `${styles.centered}` : ''}`}>
                        <Image
                            src={arr.billede.url}
                            layout='responsive'
                            height='900'
                            width='1600'
                            objectFit='cover'
                            objectPosition='center'
                            alt={arr.billede.alt}
                            quality='100'/>
                    </div>
                }
            </div>
        </section>
    )
}
