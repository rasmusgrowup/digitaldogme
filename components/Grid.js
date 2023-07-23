import styles from '../styles/grid.module.scss'
import Image from "next/image";
import Button from "./Button";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

export default function Grid({props, index}) {
    const lightTheme = props.colorTheme === 'Light';

    return (
        <>
            <section className={props.colorTheme === 'Dark' ? `${styles.dark}` : props.colorTheme === 'Grey' ? `${styles.grey}` : ''} id={props.id}
                     style={{scrollMarginTop: '50px'}}>
                <div className={styles.inner}>
                    {props.gridHeading && <h2 className={styles.heading}
                                              style={index === 0 || !lightTheme ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>{props.gridHeading}</h2>}
                    <div className={props.stretchColumns ? `${styles.columns} ${styles.stretch}` : `${styles.columns}`}>
                        {props.columns && props.columns.map((column, i) => (
                            <div key={i} className={
                                props.columns.length === 1 || !column.columnImage ? `${styles.column} ${styles.singleColumn}` : `${styles.column}`
                            }>
                                {column.columnImage &&
                                    <div className={styles.imageContainer}
                                                                style={column.columnImage && column.columnImage.backgroundColor ? {backgroundColor: column.columnImage.backgroundColor.css} : {}}>
                                        <Image
                                            src={column.columnImage.url}
                                            alt={column.columnImage.alt}
                                            height={ column.keepAspectRatio ? column.columnImage.height : '400'}
                                            width={ column.keepAspectRatio ? column.columnImage.width :'400'}
                                            objectFit='cover'
                                            objectPosition='top'
                                            quality='100'
                                        />
                                    </div>
                                }
                                {column.title && <h3 className={styles.columnTitle}>{column.title}</h3>}
                                {column.columnText && <p className={styles.columnText}>{column.columnText}</p>}
                                {column.columnButton &&
                                    <>
                                        <Link href={column.columnButton.adresse}>
                                            {column.columnButton.adresse.includes('https://') ?
                                                <a target='_blank' rel="noopener noreferrer" className={styles.icon}>
                                                    {column.columnButton.label}
                                                    {column.columnButton.ikon &&
                                                        <FeatherIcon icon={column.columnButton.ikon} size={18} style={{color: 'var(--main)', marginLeft: '0.2rem'}}/>
                                                    }
                                                </a> :
                                                <a className={styles.icon}>
                                                    {column.columnButton.label}
                                                    {column.columnButton.ikon &&
                                                        <FeatherIcon icon={column.columnButton.ikon} size={18} style={{color: 'var(--main)', marginLeft: '0.2rem'}}/>
                                                    }
                                                </a>
                                            }
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