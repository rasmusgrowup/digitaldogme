import styles from '../styles/section.module.scss';
import Link from "next/link";
import Karussel from "../components/Karussel";

export default function Section({section, topSection, index}) {
    const isDark = section.colorTheme === 'Dark';
    console.log(topSection)

    return (
        <section className={isDark ? `${styles.darkSection}` : `${styles.section}`} style={topSection ? {paddingTop: '0'} : {}}>
            {(section.sectionHeader.paragraph || section.richText) && section.sectionHeader ?
                <header className={styles.header}
                        style={index === 0 || isDark ? {border: 'none'} : {borderTop: '1px solid var(--main)'}}>
                    <h2 className={styles.h2}>{section.sectionHeader.heading}</h2>
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