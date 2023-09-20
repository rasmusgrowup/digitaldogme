import styles from '../styles/testimonial.module.scss'
import Image from "next/image";

export default function Testimonial({ section, index, shouldHaveLine }) {
    return (
        <section className={styles.section}>
            <div className={styles.inner} >
                <figure className={styles.figure}>
                    <blockquote className={styles.blockquote}>
                        <p className={styles.quote}>{`“`}{section.quote}{`”`}</p>
                        <figcaption className={styles.figcaption}>
                            <div className={styles.name}>{section.name}</div>
                            <div className={styles.jobTitle}>{section.jobTitle}</div>
                        </figcaption>
                    </blockquote>
                </figure>
                { section.image &&
                    <div className={styles.imageContainer}>
                        <Image src={section.image.url}
                               height='900'
                               width='900'
                               alt={section.image.alt}
                               quality='100'
                               sizes='(min-width: 808px) 50vw, 100vw'
                               objectFit='cover'
                               objectPosition='top'
                        />
                    </div>
                }
            </div>
        </section>
    )
}