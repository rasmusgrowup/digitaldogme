import styles from '../styles/section.module.scss';
import Link from "next/link";
import Karussel from "../components/Karussel";
import Image from "next/image";
import FeatherIcon from "feather-icons-react";
import Row from "../components/Row";

export default function Section({section, topSection, index, shouldHaveLine}) {
    const lightTheme = !section.sectionTheme === 'blue' || !section.sectionTheme === 'dark';
    let theme = section.sectionTheme ? section.sectionTheme.toLowerCase() : ''

    return (
        <section className={`
            ${theme === 'dark' ? `${styles.dark}` : theme === 'sky' ? `${styles.sky}` : theme === 'blue' ? `${styles.blue}` : theme === 'light' ? `${styles.light}` : theme === 'curry' ? `${styles.curry}` : theme === 'turquoise' ? `${styles.turquoise}` : theme === 'grey' ? `${styles.grey}` : theme === 'green' ? `${styles.green}` : theme === 'sand' ? `${styles.sand}` : `${styles.bg}`}
            ${styles.section}
            `} style={topSection ? {paddingTop: '0'} : {} && {scrollMarginTop: '50px'}} id={section.id}>
            {section.sectionHeader || section.richText ?
                <header className={styles.header}
                        style={index === 0 || section.sectionTheme !== null || !shouldHaveLine ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    {section.sectionHeader && <h2 className={styles.h2}>{section.sectionHeader.heading}</h2>}
                    <div className={styles.column}>
                        {section.sectionHeader && <p className={styles.p}>{section.sectionHeader.paragraph}</p>}
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
                    {section.sectionHeader && <h2 className={styles.h2}>{section.sectionHeader.heading}</h2>}
                    {section.sectionLink &&
                        <div className={styles.link}>
                            <Link href={section.sectionLink.adresse}>{section.sectionLink.titel}</Link>
                        </div>
                    }
                </header>
            }
            { section.blocks && section.blocks.__typename === 'Karussel' && <Karussel arr={section.blocks} /> }
            { section.rows && section.rows.map((row, i) => (
                <Row row={row} key={row.id}/>
            ))}
        </section>
    )
}