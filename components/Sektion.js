// Default imports
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'

// SCSS Styling
import styles from '../styles/sektion.module.scss'

function Heading({overskrift}) {
    const punctuationMarks = ['.', '?'];

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
        <h2 className={styles.h2}>
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

export default function Sektion({arr, index}) {
    const router = useRouter()
    return (
        <section className={styles.section}>
            <div className={`${styles.inner} ${arr.align === 'center' ? `${styles.centerAligned}` : ''}`}
                 style={index === 0 ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                <div className={styles.column}>
                    {arr.titel && <Heading overskrift={arr.titel}/>}
                    <div className={styles.p} dangerouslySetInnerHTML={{__html: `${arr.tekst.html}`}}/>
                    {arr.cta &&
                        <Link href={arr.cta.link}>
                            <a className={styles.link}>{arr.cta.label}</a>
                        </Link>
                    }
                </div>
                {arr.billede != null &&
                    <div className={`${styles.imageContainer} ${arr.align === 'center' ? `${styles.centered}` : ''}`}>
                        {arr.align !== 'center' ?
                            <Image
                                src={arr.billede.url}
                                height='900'
                                width='900'
                                alt={arr.billede.alt}
                                quality='100'
                                sizes='(min-width: 808px) 50vw, 100vw'
                                objectFit='cover'
                                objectPosition='top'/>
                            :
                            <Image
                                src={arr.billede.url}
                                height={arr.billede.height}
                                width={arr.billede.width}
                                objectFit='cover'
                                objectPosition='center'
                                alt={arr.billede.alt}
                                quality='100'/>
                        }
                    </div>
                }
            </div>
        </section>
    )
}
