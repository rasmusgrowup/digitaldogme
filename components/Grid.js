import styles from '../styles/grid.module.scss'
import Image from "next/image";
import Button from "./Button";
import FeatherIcon from "feather-icons-react";
import Link from "next/link";

function Heading({overskrift, lightTheme, index}) {
    const punctuationMarks = ['.'];

    // Function to escape special characters in a regular expression
    const escapeRegExp = (str) => {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape all special characters
    };

    const splitStringWithPunctuation = (str) => {
        const regex = new RegExp(
            `(${punctuationMarks.map((mark) => escapeRegExp(mark)).join('|')})`
        );
        return str.split(regex);
    };

    return (
        <h2 className={styles.heading}>
            {splitStringWithPunctuation(overskrift).map((word, index) => {
                // Check if the word is a punctuation mark
                if (punctuationMarks.includes(word)) {
                    return (<span key={index} className={styles.redPunctuation}>{word}</span>);
                } else {
                    return word;
                }
            })}
        </h2>
    );
}

export default function Grid({props, index, shouldHaveLine}) {
    const lightTheme = !props.gridTheme === 'blue' || !props.gridTheme === 'dark';
    let theme = props.gridTheme ? props.gridTheme.toLowerCase() : ''

    return (
        <>
            <section className={`${theme === 'dark' ? `${styles.dark}` : theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.bg}`}`} id={props.id}
                     style={{scrollMarginTop: '50px'}}>
                <div className={styles.inner}>
                    {props.gridHeading && <header className={styles.header} style={index === 0 || props.gridTheme !== null || !shouldHaveLine ? {border: 'none'} :  {borderTop: '1px solid var(--main)'}}>
                        {props.gridHeading &&
                            <h2 className={styles.h2}>
                                {props.gridHeading}
                            </h2>
                        }
                        <div className={styles.headerColumn}>
                            {props.gridText &&
                                <p className={styles.p}>{props.gridText}</p>
                            }
                            {props.gridLink &&
                                <Link href={props.gridLink.adresse}>
                                    <a className={styles.link}>{props.gridLink.titel}</a>
                                </Link>
                            }
                        </div>
                    </header>}
                    {props.columns.length > 0 && <div className={props.stretchColumns ? `${styles.columns} ${styles.stretch}` : `${styles.columns}`}>
                        {props.columns && props.columns.map((column, i) => (
                            <div key={i} className={
                                props.columns.length === 1 || !column.columnImage ? `${styles.column} ${styles.singleColumn}` : `${styles.column}`
                            }>
                                <div className={styles.columnInner}>
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
                                    {/* column.columnText && <p className={styles.columnText}>{column.columnText}</p> */}
                                    {column.columnContent &&
                                        <div className={styles.richText} dangerouslySetInnerHTML={{__html: `${column.columnContent.html}`}}/>
                                    }
                                    {column.columnButton &&
                                        <>
                                            <Link href={column.columnButton.adresse}>
                                                {column.columnButton.adresse.includes('https://') ?
                                                    <a target='_blank' rel="noopener noreferrer" className={styles.icon}>
                                                        {column.columnButton.label}
                                                        {column.columnButton.ikon &&
                                                            <FeatherIcon icon={column.columnButton.ikon} strokeWidth={1} size={18} style={{color: 'var(--main)', marginLeft: '0.1rem'}}/>
                                                        }
                                                    </a> :
                                                    <a className={styles.icon}>
                                                        {column.columnButton.label}
                                                        {column.columnButton.ikon &&
                                                            <FeatherIcon icon={column.columnButton.ikon} strokeWidth={1} size={18} style={{color: 'var(--main)', marginLeft: '0.1rem'}}/>
                                                        }
                                                    </a>
                                                }
                                            </Link>
                                        </>
                                    }
                                </div>
                                {column.caption && <p className={styles.columnCaption}>{column.caption}</p>}
                            </div>
                        ))}
                    </div>}
                </div>
            </section>
        </>
    )
}