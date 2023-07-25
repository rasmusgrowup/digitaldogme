import styles from '../styles/section.module.scss';
import Link from "next/link";
import Karussel from "../components/Karussel";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";

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

export default function Section({section, topSection, index}) {
    const isDark = section.colorTheme === 'Dark';
    const endsWithDot = section.sectionHeader.heading;

    return (
        <section className={isDark ? `${styles.darkSection}` : `${styles.section}`} style={topSection ? {paddingTop: '0'} : {}}>
            {(section.sectionHeader.paragraph || section.richText) && section.sectionHeader ?
                <header className={styles.header}
                        style={index === 0 || isDark ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    <Heading overskrift={section.sectionHeader.heading}/>
                    <div className={styles.column}>
                        {section.sectionHeader.paragraph && <p className={styles.p}>{section.sectionHeader.paragraph}</p>}
                        {section.richText &&
                            <div className={styles.richText} dangerouslySetInnerHTML={{__html: `${section.richText.html}`}}/>
                        }
                        {section.sectionLink &&
                            <div className={styles.link}>
                                <Link href={section.sectionLink.adresse}>{section.sectionLink.titel}</Link>
                            </div>
                        }
                        {section.downloadableAsset &&
                            <div className={styles.downloadAsset}>
                                {section.downloadableAsset.preview &&
                                    <Image src={section.downloadableAsset.preview.url} width={section.downloadableAsset.preview.width} height={section.downloadableAsset.preview.height}/>
                                }
                                {section.downloadableAsset.assetTitel && <p><b>{section.downloadableAsset.assetTitel}</b></p>}
                                {section.downloadableAsset.description && <p>{section.downloadableAsset.description}</p>}
                                <Link href={section.downloadableAsset.asset.url} passHref>
                                    <a className={styles.downloadLink} download>Download {section.downloadableAsset.assetTitel} <FeatherIcon icon='arrow-up-right' size={20} strokeWidth={1}/></a>
                                </Link>
                            </div>
                        }
                    </div>
                </header> :
                <header className={`${styles.header} ${styles.spaceBetween}`} style={index === 0 ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    <h2 className={styles.h2}>{section.sectionHeader.heading}</h2>
                    {section.sectionLink &&
                        <div className={styles.link}>
                            <Link href={section.sectionLink.adresse}>{section.sectionLink.titel}</Link>
                        </div>
                    }
                </header>
            }
            { section.blocks && section.blocks.__typename === 'Karussel' && <Karussel arr={section.blocks} /> }
        </section>
    )
}