// Default imports
import Image from "next/image"
import Link from "next/link"

// Framer motion
import {motion} from 'framer-motion';

// SCSS Styling
import styles from '../styles/hero.module.scss'

// Feather icons
import FeatherIcon from 'feather-icons-react';

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
        <h1 className={styles.h1}>
            {splitStringWithPunctuation(overskrift).map((word, index) => {
                // Check if the word is a punctuation mark
                if (punctuationMarks.includes(word)) {
                    return (<span key={index} className={styles.redPunctuation}>{word}</span>);
                } else {
                    return word;
                }
            })}
        </h1>
    );
}

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
                        <Heading overskrift={overskrift}/>
                    </div>
                </div>
            </section>
        </>
    )
}
