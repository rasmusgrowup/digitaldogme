// Default imports
import Image from "next/image"
import Link from "next/link"
import React, {useRef} from 'react'

// SCSS Styling
import styles from '../styles/animeret.module.scss'

// Framer motion
import {motion} from 'framer-motion';

const variants = {
    hidden: {
        y: 0,
    },
    visible: {
        y: 0,
        transition: {
            //delayChildren: 1,
            staggerChildren: 0.1
        }
    }
}

const items = {
    hidden: {
        y: '120%',
    },
    visible: {
        y: 0,
        transition: {
            duration: 3,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function NumberArrayMapping({ item }) {
    const numberWithDots = (number) => {
        const strNumber = number.toString();
        const parts = [];
        let i = strNumber.length;

        while (i > 0) {
            parts.unshift(strNumber.substring(Math.max(0, i - 3), i));
            i -= 3;
        }

        return parts.join('.');
    };

    const formattedNumber = numberWithDots(item.tal);

    return (
        <motion.div
            className={styles.talWrapper}
            whileInView="visible"
            variants={variants}
            initial="hidden"
            viewport={{ once: true }}
        >
            {formattedNumber.split('').map((digit, index) => (
                <motion.span className={styles.digit} variants={items} key={index}>
                    {digit}
                </motion.span>
            ))}
            {item.enhed && (
                <motion.span variants={items} className={styles.enhed}>
                    {item.enhed}
                </motion.span>
            )}
        </motion.div>
    );
}


export default function Animeret({arr, index, shouldHaveLine}) {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.inner}
                     style={index === 0 || !shouldHaveLine ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    <div className={styles.column}>
                        <div className={styles.innerColumn}>
                            <h2 className={styles.h2}>
                                {arr.overskriftAnimeret}
                            </h2>
                            <p className={styles.p}>{arr.tekstAnimeret}</p>
                        </div>
                    </div>
                    <div className={styles.container}>
                        {arr.animeredeTal.map((item, i) => (
                            <div className={styles.item} key={i}>
                                <div className={styles.tal}>
                                    {item && <NumberArrayMapping item={item}/>}
                                </div>
                                <div className={styles.betydning}>
                                    {item.__typename === 'Number' ?
                                        `${item.betydning}` : `${item.beskrivelse}`
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
