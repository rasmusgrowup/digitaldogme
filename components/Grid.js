import styles from '../styles/grid.module.scss'
import Image from "next/image";
import Button from "./Button";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

export default function Grid({props}) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.inner}>
                    <h2 className={styles.heading}>{props.gridHeading}</h2>
                    <div className={styles.columns}>
                        {props.columns && props.columns.map((column, i) => (
                            <div key={i} className={
                                props.columns.length === 1 || !column.columnImage ? `${styles.column} ${styles.singleColumn}` : `${styles.column}`
                            }>
                                { column.columnImage && <div className={styles.imageContainer}
                                     style={column.columnImage && column.columnImage.backgroundColor ? {backgroundColor: column.columnImage.backgroundColor.css} : {}}>
                                    <Image
                                        src={column.columnImage.url}
                                        alt={column.columnImage.alt}
                                        height='500'
                                        width='400'
                                        objectFit='cover'
                                    />
                                </div> }
                                { column.title && <p className={styles.columnTitle}>{column.title}</p>}
                                { column.columnText && <p className={styles.columnText}>{column.columnText}</p>}
                                { column.columnButton &&
                                    <>
                                        <Link href={column.columnButton.adresse}>
                                            <a target='_blank' className={styles.icon}>
                                                {column.columnButton.label}
                                                <FeatherIcon icon={column.columnButton.ikon} size={18} style={{ color: 'var(--main)', marginLeft: '0.2rem' }}/>
                                            </a>
                                        </Link>
                                    </>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}