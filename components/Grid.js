import styles from '../styles/grid.module.scss'
import Image from "next/image";

export default function Grid({props}) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.inner}>
                    <h2 className={styles.heading}>{props.gridHeading}</h2>
                    <div className={styles.columns}>
                        {props.columns && props.columns.map((column, i) => (
                            <div key={i} className={styles.column}>
                                <div className={styles.imageContainer}
                                     style={{backgroundColor: column.columnImage.backgroundColor.css}}>
                                    <Image
                                        src={column.columnImage.url}
                                        alt={column.columnImage.alt}
                                        height={column.columnImage.height}
                                        width={column.columnImage.width}
                                    />
                                </div>
                                <p className={styles.imageDescription}>{column.imageDescription}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}